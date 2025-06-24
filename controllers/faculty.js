const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");
const uploadObject = require("../minio/uploadFiles");
const fileSaver = require("../Utilities/fileSaver");

// Get all faculty members
const getAllFaculty = async (req, res) => {
  try {
    const { depo_code } = req.query;    
    const [rows] = await db.execute(queries.getAllFaculty, [depo_code]);
    const faculties = rows.map(faculty => {
      const facultyImageFolderPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "faculty",
        faculty.image_name
      );

      let image = null;
      try {
        if (fs.existsSync(facultyImageFolderPath)) {
          const files = fs.readdirSync(facultyImageFolderPath);
          if (files.length > 0) {
            image = `uploads/faculty/${faculty.image_name}/${files[0]}`; 
          }
        }
      } catch (err) {
        console.error(`Error fetching images for ${faculty.image_name}:`, err);
      }
      return {...faculty, image};      
    });    

    res.json(faculties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching faculty data", error });
  }
};


// Get faculty by ID
const getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(queries.getFacultyById, [id]);
    res.json(rows[0] || { message: "Faculty not found" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching faculty data" });
  }
};

// Add a new faculty member
const addFaculty = async (req, res) => {
  const { faculty_name, email, faculty_role, depo_code, number, qualification } = req.body;
  try {
    if (!req.files?.image) {
      return res.status(400).json({ message: "Faculty image is required" });
    }

    const imagePath = await fileSaver(req.files.image, email, "faculty");

    await db.execute(queries.addFaculty, [
      faculty_name,
      email,
      faculty_role,
      depo_code,
      number,
      qualification,
      imagePath, 
    ]);

    return res.status(201).json({ message: "Faculty added successfully" });
  } catch (error) {
    console.log("Error in adding a new faculty:", error);
    res.status(500).json({ message: "Error adding faculty", error });
  }
};

// Update faculty details
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { faculty_name, email, faculty_role, depo_code, number, qualification } = req.body;
  try {
    const facultyimage = req.files?.image;
    console.log("Updating faculty with ID:", id);
    const [rows] = await db.execute(queries.getFacultyById, [id]);
    
    const folder = path.join(process.cwd(), "public", "uploads", "faculty", email || rows[0].email);
    if (facultyimage) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      else{
        // If folder exists, delete existing files
        const files = fs.readdirSync(folder);
        for (const file of files) {
          fs.unlinkSync(path.join(folder, file));
        }
      }
      facultyimage.mv(path.join(folder, req.files.image.name), (err) =>
        {
          if (err) {
            console.log("Error occured in storing image");
            return
          }
          console.log("Image stored successfully"); 
        }
      );
    }
    await db.execute(queries.updateFaculty, [
      faculty_name || rows[0].faculty_name,
      email || rows[0].email,
      faculty_role || rows[0].faculty_role,
      number || rows[0].number,
      qualification || rows[0].qualification,
      depo_code || rows[0].depo_code,
      email || rows[0].email,

      id,
    ]);
    res.json({ message: "Faculty updated successfully" });
  } catch (error) {
    console.log("error in updating faculty : ", error);
    
    res.status(500).json({ message: "Error updating faculty", error });
  }
};

// Delete a faculty member
const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute(queries.deleteFaculty, [id]);
    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting faculty" });
  }
};

module.exports = {
  getAllFaculty,
  getFacultyById,
  addFaculty,
  updateFaculty,
  deleteFaculty,
};
