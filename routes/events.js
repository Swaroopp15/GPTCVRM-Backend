const { getEvents, addEvent, deleteEvent, updateEvent, getEventById } = require('../controllers/events');
const upload = require('../handlers/multer');

const Router = require('express').Router();

Router.get("/", getEvents);
Router.post("/", upload.fields([{name: 'event_images', maxCount:12}]),addEvent);
Router.delete("/:id", deleteEvent);
Router.put("/:id", upload.fields([{name: 'event_images', maxCount:12}]), updateEvent);
Router.get("/:id", getEventById);
module.exports = Router;