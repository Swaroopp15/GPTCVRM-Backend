const { getEvents, addEvent, deleteEvent } = require('../controllers/events');
const upload = require('../handlers/multer');

const Router = require('express').Router();

Router.get("/", getEvents);
Router.post("/", upload.fields([{name: 'images', maxCount:12}]),addEvent);
Router.delete("/:id", deleteEvent);

module.exports = Router;