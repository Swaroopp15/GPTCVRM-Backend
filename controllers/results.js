const db = require("../database/db");

const getAllResults = async (req, res) => {
  const { year, depo_code } = req.query;
  if (!year || !depo_code) {
    return res.status(400).json({ error: "year and depo_code are required" });
  }
  try {
    const [rows] = await db.execute("SELECT r.*, s.* FROM results r join students s on r.student_id = s.id where s.depo_code = ? and r.passed_year = ?", [depo_code, year]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No results found for the specified year and depo_code" });
    }
    res.json(rows);
  } catch (error) {
    console.log("Error at getting all results : ", error);
    res.status(500).json({ message: "Error fetching results", error });
  }
};

const getAvailableYears = async (req, res) => {
  try {
    const depo_code = req.query.depo_code;
    if (!depo_code) {
      return res.status(400).json({ error: "depo_code is required" });
    }
    const [rows] = await db.execute("SELECT DISTINCT r.passed_year as year FROM results r join students s WHERE s.depo_code = ? ORDER BY r.passed_year DESC", [depo_code]);
    res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching years" });
  }
};
// const getAvailableDepartments = async (req, res) => {
//   try {
//     const year = req.query.year;
//     const [rows] = await db.execute("SELECT DISTINCT depo_code FROM results WHERE year = ?", [year]);
//     res.json({
//       departments : rows
//     })
//   } catch (error) {
//     console.log("Error at getting available departments for specified year : ", error);
//     res.status(500).send({message: "Error at getting available departments for specified year", error});
//   }
// } 

const addResultRecord = async(pin, application_id, percentage, year) => {
  try{
    const [student] = await db.execute("SELECT id FROM students WHERE pin = ?", [pin]);
    if (student.length === 0) {
      throw new Error("Student not found");
    }
    await db.execute(
      "INSERT INTO `results` (student_id, application_id, passed_year, percentage) VALUES (?, ?, ?, ?);",
      [student[0].id, application_id, year, percentage]
    );
    return true;
  }
  catch (error) {
    console.log("Error at adding result record : ", error);
    return false;
}
}

const addResult = async (req, res) => {
  const { pin, application_id, percentage, year} = req.body;
  try {
    addResultRecord(pin, application_id, percentage, year);
    res.json({ message: "Result record added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding result record", error });
    console.log("Error at adding result record : ", error);
    
  }
};

// Delete a result record
const deleteResult = async (req, res) => {
  const { pin } = req.params;
  try {
    const [student] = await db.execute("SELECT id FROM students WHERE pin = ?", [pin]);
    await db.execute("DELETE FROM results WHERE id = ?", [student[0].id]);
    res.json({ message: "Result record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting result record", error });
  }
};

const searchResult = async (req, res) => {
  try {
    const {query} = req.query;
    const newQuery = "%"+query+"%";
    const data = await db.execute("SELECT r.*, s.* FROM results r JOIN students s ON s.id = r.student_id WHERE s.name LIKE ? OR r.application_id LIKE ? OR s.pin LIKE ?", [newQuery, newQuery, newQuery])
    res.json(data[0])
  } catch (error) {
    console.log("Error in Searching Results : ", error);
    res.status(500).json({ message: "Error searching result record", error });
  }
}

// const addBulkResults = async (req, res) => {
//   const results = req.body;

//   if (!Array.isArray(results) || results.length === 0) {
//     return res.status(400).json({ message: "Invalid data. Expected an array of result records." });
//   }

//   const connection = await db.getConnection(); // Transaction-safe connection

//   try {
//     await connection.beginTransaction();

//     for (const result of results) {
//       const {
//         pin,
//         name,
//         application_id,
//         percentage,
//         year,
//         depo_code,
//         admission_year
//       } = result;

//       // Step 1: Find student
//       const [students] = await connection.execute(
//         "SELECT id FROM students WHERE pin = ?",
//         [pin]
//       );

//       let studentId;

//       if (students.length > 0) {
//         studentId = students[0].id;
//       } else {
//         // Insert new student
//         const [insertStudent] = await connection.execute(
//           "INSERT INTO students (pin, name, admission_year, depo_code) VALUES (?, ?, ?, ?)",
//           [pin, name, admission_year || year, depo_code]
//         );
//         studentId = insertStudent.insertId;
//       }

//       // Step 2: Check if result for this student + application_id already exists
//       const [existingResults] = await connection.execute(
//         "SELECT id FROM results WHERE student_id = ? AND application_id = ?",
//         [studentId, application_id]
//       );

//       if (existingResults.length > 0) {
//         // UPDATE existing result
//         await connection.execute(
//           "UPDATE results SET percentage = ?, passed_year = ? WHERE student_id = ? AND application_id = ?",
//           [percentage, year, studentId, application_id]
//         );
//       } else {
//         // INSERT new result
//         await connection.execute(
//           "INSERT INTO results (student_id, application_id, percentage, passed_year) VALUES (?, ?, ?, ?)",
//           [studentId, application_id, percentage, year]
//         );
//       }
//     }

//     await connection.commit();
//     connection.release();

//     res.status(201).json({ message: "Bulk results inserted/updated successfully." });
//   } catch (error) {
//     await connection.rollback();
//     connection.release();
//     console.error("Error at bulk add/update results:", error);
//     res.status(500).json({ message: "Error adding or updating bulk results", error });
//   }
// };

const addBulkResults = async (req, res) => {
  try {
    const results = req.body;
    console.log(results);
    
    const response = {};
    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({ message: "Invalid data. Expected an array of result records." });
    }
    results.forEach(result => {
      const { pin, application_id, percentage, year } = result;
      if (!pin || !application_id || !percentage || !year) {
        throw new Error("All fields are required for each result record");
      }
      const status = addResultRecord(pin, application_id, percentage, year);
      if (!status) {
        response[pin] = status;
      }
    }
  )
  res.status(201).json({ message: "Bulk results added successfully, failed pins are forwarded", response });
  } catch (error) {
    console.log("Error at adding bulk results : ", error);
    res.status(500).json({ message: "Error adding bulk results", error });
  }
}


module.exports = { getAllResults, addResult, deleteResult, getAvailableYears, searchResult,addBulkResults, 
  // getAvailableDepartments 
};
