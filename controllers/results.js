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
    res.status(500).json({ error: "Error deleting result record" });
  }
};

module.exports = { getAllResults, addResult, deleteResult, getAvailableYears };
