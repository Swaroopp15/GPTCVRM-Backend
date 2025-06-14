const db = require("../database/db");
const queries = require("../database/queries");

const getStudents = async (req, res) => {
  try {
    const {semester, depo_code} = req.query;
    if (!semester || !depo_code) {
      return res.status(400).json({ error: "semester and depo_code are required" });
    }
    const [students] = await db.execute(queries.getStudentsBySem, [depo_code, semester]);
    res.status(200).json(students);
  } catch (error) {
    console.log("Error in getting students details : ", error);
    res.status(500).send({message: "Error in getting students details", error});
  }
}

const getAdmissionYears = async (req, res) => {
  try {
    const {depo_code} = req.query;
    if (!depo_code) {
      return res.status(400).json({ error: "depo_code is required" });
    }
    const [years] = await db.execute(queries.getAvailableAdmissionYears, [depo_code]);
    res.status(200).json(years);
  } catch (error) {
    console.log("Error in getting admission years : ", error);
    res.status(500).send({message: "Error in getting admission years", error});
  }
}

const addNewStudent = async (req, res) => {
  const { name, pin, admission_year, semester, depo_code } = req.body;
  try {
    if (!name || !pin || !admission_year || !semester || !depo_code) {
      return res.status(400).json({ error: "All fields are required" });
    }
    await db.execute(queries.addStudent, [name, pin, admission_year, semester, depo_code]);
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.log("Error in adding new student : ", error);
    res.status(500).send({message: "Error in adding new student", error});
  }
}

const studentsForResults = async (req, res) => {
  const { admission_year, depo_code } = req.query;
  if (!admission_year || !depo_code) {
    return res.status(400).json({ error: "admission_year and depo_code are required" });
  }
  try {
    const [students] = await db.execute(queries.getStudentsForResults, [admission_year, depo_code]);
    console.log(students);
    
    res.status(200).json(students);
  } catch (error) {
    console.log("Error in getting students for results : ", error);
    res.status(500).send({message: "Error in getting students for results", error});
  }
}

const addStudentsBulk = async (req, res) => {
  const { students } = req.body;
  if (!students || !Array.isArray(students)) {
    return res.status(400).json({ error: "students must be an array" });
  }
  try {
    const promises = students.map(student => {
      const { name, pin, admission_year, semester, depo_code } = student;
      if (!name || !pin || !admission_year || !semester || !depo_code) {
        throw new Error("All fields are required for each student");
      }
      return db.execute(queries.addStudent, [name, pin, admission_year, semester, depo_code]);
    });
    await Promise.all(promises);
    res.status(201).json({ message: "Students added successfully" });
  } catch (error) {
    console.log("Error in adding students in bulk : ", error);
    res.status(500).send({message: "Error in adding students in bulk", error});
  }
}


const studentsForPlacements = async (req, res) => {
  const { admission_year, depo_code } = req.query;
  if (!admission_year || !depo_code) {
    return res.status(400).json({ error: "admission_year and depo_code are required" });
  }
  try {
    const [students] = await db.execute(queries.getStudentsForPlacements, [admission_year, depo_code]);
    res.status(200).json(students);
  } catch (error) {
    console.log("Error in getting students for placements : ", error);
    res.status(500).send({message: "Error in getting students for placements", error});
  }
}

const deleteStudent = async (req, res) => {
  const { pin } = req.params;
  try {
    await db.execute(queries.deleteStudent, [pin]);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log("Error in deleting student : ", error);
    res.status(500).send({message: "Error in deleting student", error});
  }
}

const updateStudent = async (req, res) => {
  const { pin } = req.params;
  const { name, newPin, admission_year, semester, depo_code } = req.body;
  try {
    await db.execute(queries.updateStudent, [name, name, name, newPin, newPin, newPin, admission_year, admission_year, admission_year, semester, semester, semester, depo_code, depo_code, depo_code, pin]);
    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.log("Error in updating student : ", error);
    res.status(500).send({message: "Error in updating student", error});
  }
}

module.exports = {
  getStudents,
  getAdmissionYears,
  addNewStudent,
  studentsForResults,
  studentsForPlacements,
  deleteStudent,
  updateStudent,
  addStudentsBulk
}