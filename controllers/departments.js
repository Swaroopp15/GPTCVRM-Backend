const db = require("../database/db");
const queries = require("../database/queries");

const getAllDepartments = async (req, res) => {
  try {
    const [rows] = await db.execute(queries.getAllDepartments);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching departments" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { depo_code } = req.params;
    const [rows] = await db.execute(queries.getDepartment, [depo_code]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching department" });
  }
};

// Add a new department
const addDepartment = async (req, res) => {
  const { depo_code, department_name, vision, mission } = req.body;
  try {
    await db.execute(queries.addDepartment, [
      depo_code,
      department_name,
      vision,
      mission
    ]);
    res.json({ message: "Department added successfully" });
  } catch (error) {
    res.status(500).json({message: "Error adding department", error });
  }
};

// Update department details
const updateDepartment = async (req, res) => {
  const { depo_code } = req.params;
  const { department_name, vision, mission, nba_status } = req.body;
  try {
    await db.execute(queries.updateDepartment, [
      department_name,
      vision,
      mission,
      nba_status,
      depo_code,
    ]);
    res.json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating department" });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  const { depo_code } = req.params;
  try {
    await db.execute(queries.deleteDepartment, [depo_code]);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting department" });
  }
};

module.exports = {
  getAllDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
