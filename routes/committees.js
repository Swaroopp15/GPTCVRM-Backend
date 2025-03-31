const { getCommitteeNames, getCommitteeInfo, addCommittee, addCommitteeMember, deleteCommittee, getAvailableFaculty } = require('../controllers/committes');

const Router = require('express').Router();

Router.get('/', getCommitteeNames);
Router.get("/all", getAvailableFaculty)
Router.get('/info/:id', getCommitteeInfo);
Router.post("/add", addCommittee);
Router.put("/add", addCommitteeMember);
Router.delete("/delete/:id", deleteCommittee);

module.exports = Router;