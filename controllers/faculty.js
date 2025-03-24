const db = require("../database/db");
const queries = require("../database/queries");

// Get all faculty members
const getAllFaculty = async (req, res) => {
  try {
    const [rows] = await db.execute(queries.getAllFaculty);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching faculty data" });
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
  const { faculty_name, email, faculty_role, depo_code, image_name } = req.body;
  try {
    await db.execute(queries.addFaculty, [
      faculty_name,
      email,
      faculty_role,
      depo_code,
      image_name,
    ]);
    res.json({ message: "Faculty added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding faculty" });
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
