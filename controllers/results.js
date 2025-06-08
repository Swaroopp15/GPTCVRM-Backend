const db = require("../database/db");

const getAllResults = async (req, res) => {
  const { year, depo_code } = req.query;
  try {
    const [rows] = await db.execute("SELECT * FROM results WHERE year = ? AND depo_code = ?", [year, depo_code]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching results" });
  }
};

const getAvailableYears = async (req, res) => {
  try {
    const depo_code = req.query.depo_code;
    if (!depo_code) {
      return res.status(400).json({ error: "depo_code is required" });
    }
    const [rows] = await db.execute("SELECT DISTINCT year FROM results  WHERE depo_code = ? ORDER BY year DESC", [depo_code]);
    res.json(rows);
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching years" });
  }
};
const getAvailableDepartments = async (req, res) => {
  try {
    const year = req.query.year;
    const [rows] = await db.execute("SELECT DISTINCT depo_code FROM results WHERE year = ?", [year]);
    res.json({
      departments : rows
    })
  } catch (error) {
    console.log("Error at getting available departments for specified year : ", error);
    res.status(500).send({message: "Error at getting available departments for specified year", error});
  }
} 

const addResult = async (req, res) => {
  const { pin, name, application_id, percentage, year, depo_code } = req.body;
  try {
    await db.execute(
      "INSERT INTO results (pin, name, application_id, percentage, year, depo_code) VALUES (?, ?, ?, ?, ?,?)",
      [pin, name, application_id, percentage, year, depo_code]
    );
    res.json({ message: "Result record added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding result record", error });
    console.log("Error at adding result record : ", error);
    
  }
};

// Delete a result record
const deleteResult = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM results WHERE id = ?", [id]);
    res.json({ message: "Result record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting result record", error });
  }
};

const searchResult = async (req, res) => {
  try {
    const {query} = req.query;
    const newQuery = "%"+query+"%";
    const data = await db.execute("SELECT * FROM results WHERE name LIKE ? OR application_id LIKE ? OR pin LIKE ?", [newQuery, newQuery, newQuery])
    res.json(data[0])
  } catch (error) {
    console.log("Error in Searching Results : ", error);
    res.status(500).json({ message: "Error searching result record", error });
  }
}

const addBulkResults = async (req, res) => {
  const results = req.body;

  if (!Array.isArray(results) || results.length === 0) {
    return res.status(400).json({ message: "Invalid data. Expected an array of result records." });
  }

  try {
    const placeholders = results.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const values = results.flatMap(result => [
      result.pin,
      result.name,
      result.application_id,
      result.percentage,
      result.year,
      result.depo_code
    ]);

    const sql = `
      INSERT INTO results (pin, name, application_id, percentage, year, depo_code)
      VALUES ${placeholders}
    `;

    await db.execute(sql, values);

    res.status(201).json({ message: "Bulk results added successfully." });
  } catch (error) {
    console.error("Error at bulk adding results:", error);
    res.status(500).json({ message: "Error adding bulk results", error });
  }
};

module.exports = { getAllResults, addResult, deleteResult, getAvailableYears, searchResult,addBulkResults, getAvailableDepartments };
