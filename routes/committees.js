const { getCommitteeNames, getCommitteeInfo, addCommittee, addCommitteeMember, deleteCommittee, getAvailableFaculty, updateCommittee } = require('../controllers/committes');
const isAuthenticated = require('../controllers/isLogined');

const Router = require('express').Router();

Router.get('/', getCommitteeNames);
Router.get("/all", getAvailableFaculty)
Router.get('/info/:id', getCommitteeInfo);
Router.post("/add", isAuthenticated, addCommittee);
Router.put("/add", isAuthenticated, addCommitteeMember);
Router.put("/", isAuthenticated, updateCommittee);
Router.delete("/delete/:id", isAuthenticated, deleteCommittee);

module.exports = Router;