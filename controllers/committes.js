const db = require("../database/db");
const queries = require("../database/queries");

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
    res.json(committeeInfo[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching committee info" });
  }
};

const addCommitteeMember = async (req, res) => {
  try {
    const { committee_id, faculty_id, role } = req.body;
    const result = await db.query(queries.addCommitteeMember, [
      committee_id,
      faculty_id,
      role,
    ]);
    console.log(result[0]);
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
    console.log(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding committee" });
  }
};

const deleteCommittee = async(req, res) => {
  try {
    const { committee_id } = req.params;
    const result = await db.query(queries.deleteCommittee, [committee_id]);
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
  deleteCommittee
}