const { getAdmissions, addAdmission } = require('../controllers/admissons');
const isAuthenticated = require('../controllers/isLogined');

const Router = require('express').Router();

Router.get("/", getAdmissions);
Router.post("/", isAuthenticated,  addAdmission);

module.exports = Router;