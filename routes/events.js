const { getEvents, addEvent, deleteEvent, updateEvent, getEventById } = require('../controllers/events');
const isAuthenticated = require('../controllers/isLogined');
const upload = require('../handlers/multer');

const Router = require('express').Router();

Router.get("/", getEvents);
Router.get("/:id", getEventById);
Router.post("/",isAuthenticated, addEvent);
Router.delete("/:id",isAuthenticated,  deleteEvent);
Router.put("/:id",isAuthenticated,  updateEvent);
module.exports = Router;