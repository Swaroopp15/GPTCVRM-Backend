const { getCommitteeNames, getCommitteeInfo, addCommittee, addCommitteeMember, deleteCommittee } = require('../controllers/committes');

const Router = require('express').Router();

Router.get('/', getCommitteeNames);
Router.get('/:id', getCommitteeInfo);
Router.post("/add", addCommittee);
Router.put("/add", addCommitteeMember);
Router.delete("/delete/:id", deleteCommittee);

module.exports = Router;