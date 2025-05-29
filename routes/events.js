const { getEvents, addEvent, deleteEvent, updateEvent, getEventById } = require('../controllers/events');
const upload = require('../handlers/multer');

const Router = require('express').Router();

Router.get("/", getEvents);
Router.post("/",addEvent);
Router.delete("/:id", deleteEvent);
Router.put("/:id", updateEvent);
Router.get("/:id", getEventById);
module.exports = Router;