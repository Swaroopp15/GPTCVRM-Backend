const { getAdmissions, addAdmission } = require('../controllers/admissons');

const Router = require('express').Router();

Router.get("/", getAdmissions);
Router.post("/", addAdmission);

module.exports = Router;