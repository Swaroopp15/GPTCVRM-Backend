const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");

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
          const files = fs.readdirSync(facultyImageFolderPath); // Read all files inside folder
          if (files.length > 0) {
            image = `uploads/faculty/${faculty.image_name}/${files[0]}`; // ✅ Return URL path
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
  const { faculty_name, email, faculty_role, depo_code } = req.body;
  try {
    const image_name = email;
    await db.execute(queries.addFaculty, [
      faculty_name,
      email,
      faculty_role,
      depo_code,
      image_name,
    ]);
    res.json({ message: "Faculty added successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error adding faculty", error });
  }
};

// Update faculty details
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { faculty_name, email, faculty_role, depo_code, image_name } = req.body;
  try {
    await db.execute(queries.updateFaculty, [
      faculty_name,
      email,
      faculty_role,
      depo_code,
      image_name,
      id,
    ]);
    res.json({ message: "Faculty updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating faculty" });
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
