const fileUpload = require("express-fileupload");
const db = require("../database/db");
const queries = require("../database/queries");
const path = require('path');
const fs = require("fs");
const fileSaver = require('../utilities/fileSaver');


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
    const imagePath = path.join(process.cwd(), "public", "uploads", "departments", depo_code.toLowerCase());
    let department = {...rows[0]};
    if(fs.existsSync(imagePath)) {
      const files = fs.readdirSync(imagePath);
      const images = files.map((file) => {
        return "uploads/departments/"+depo_code.toLowerCase()+"/"+file;
      })
      department = {...department,department_image: images[0]}
    }
    res.json(department);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error fetching department", error });
  }
};

// Add a new department
const addDepartment = async (req, res) => {
  const { depo_code, department_name, vision, mission, avg_pass } = req.body;

  try {
    let imagePath = null;

    if (req.files?.department_image) {
      imagePath = await fileSaver(
        req.files.department_image,
        depo_code.toLowerCase(),
        "departments"
      );
    }
const department_image = imagePath ? imagePath : null;
    await db.execute(queries.addDepartment, [
      depo_code,
      department_name,
      vision,
      mission,
      avg_pass,
      department_image,
    ]);

    res.json({ message: "Department added successfully", department_image });
  } catch (error) {
    console.log("Error in adding new Department:", error);
    res.status(500).json({ message: "Error adding department", error });
  }
};

// Update department details
const updateDepartment = async (req, res) => {
  const { depo_code } = req.params;
  const { department_name, vision, mission, avg_pass } = req.body;
  try {
    await db.execute(queries.updateDepartment, [
      department_name,department_name,department_name,
      vision,vision,vision,
      mission,mission,mission,
      avg_pass, avg_pass, avg_pass,
      depo_code,
    ]);
    res.json({ message: "Department updated successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error updating department", error });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  const { depo_code } = req.params;
  try {
    await db.execute(queries.deleteDepartment, [depo_code]);
    const imagePath = path.join(process.cwd(), "public", "uploads", "departments", depo_code.toLowerCase());
    fs.rmSync(imagePath, {recursive:true, force:true});
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.log("Error in deleting department : ", error);
    
    res.status(500).json({ message: "Error deleting department", error });
  }
};


module.exports = {
  getAllDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
