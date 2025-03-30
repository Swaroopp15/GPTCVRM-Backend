const db = require("../database/db");
const queries = require("../database/queries");

const getAdmissions = async (req, res) => {
  try {
    const admissions = await db.query(queries.getAdmissions);
    res.json(admissions[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching admissions", error: err });
  }
};

const addAdmission = async (req, res) => {
  try {
    const { depo_code, year, allocated, intake } = req.body;
    const admission = await db.query(queries.addAdmission, [
      depo_code,
      year,
      allocated,
      intake,
    ]);
    res.json(admission[0]);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error adding admissions", error: err });
  }
};

module.exports = {
  addAdmission,
  getAdmissions
}