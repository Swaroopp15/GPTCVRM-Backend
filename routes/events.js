const { getEvents, addEvent, deleteEvent } = require('../controllers/events');

const Router = require('express').Router();

Router.get("/", getEvents);
Router.post("/", addEvent);
Router.delete("/:id", deleteEvent);

module.exports = Router;