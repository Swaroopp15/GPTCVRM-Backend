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
const getAvailableFaculty = async (req, res) => {
  try {
    const [rows] = await db.execute(queries.getAvailableFaculty);
    res.json(rows);
  } catch (error) {
    console.log("error at fetching facutly who are not in any committees : ", error);
    res.status(500).send({message: "error at fetching available faculty", error});
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
  getAvailableFaculty
}