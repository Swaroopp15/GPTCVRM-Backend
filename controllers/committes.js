const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");

const getCommitteeNames = async (req, res) => {
  try {
    const committeeNames = await db.query(queries.getCommitteeNames);
    res.json(committeeNames[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching committee names" });
  }
};
const getCommitteeInfo = async (req, res) => {
  try {
    const {id} = req.params;
    const committeeInfo = await db.query(queries.getCommitteeInfo, [id]);
    const faculties = committeeInfo[0][0].members.map(faculty => {
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
    res.json({committee : committeeInfo[0], faculties: faculties});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching committee info", error: err });
  }
};
const getAvailableFaculty = async (req, res) => {
  try {
    const [rows] = await db.execute(queries.getAvailableFaculty);
    res.json(rows);
  } catch (error) {
    console.log("error at fetching facutly who are not in any committees : ", error);
    res.status(500).send({message: "error at fetching available faculty", error});
  }
}

const updateCommittee = async (req, res) => {
  try {
    const { name, about, id } = req.body;
    const result = await db.query(queries.updateCommittee, [
      name, name, name,
      about, about, about,
      id,
    ]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating committee" });
  }
}


const addCommitteeMember = async (req, res) => {
  try {
    const { committee_id, faculty_id, role } = req.body;
    const result = await db.query(queries.addCommitteeMember, [
      committee_id,
      faculty_id,
      role,
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding committee member" });
  }
};

const addCommittee = async (req, res) => {
  try {
    const { name, about} = req.body;
    const result = await db.query(queries.addCommittee, [
      name,
      about
    ]);
    res.json(result[0])
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding committee", error });
  }
};

const deleteCommittee = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.deleteCommittee, [id]);
    res.json(result[0]);
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting committee" });
  }
}

module.exports = {
  getCommitteeNames,
  getCommitteeInfo,
  addCommitteeMember,
  addCommittee,
  deleteCommittee,
  getAvailableFaculty,
  updateCommittee
}