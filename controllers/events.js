const queries = require("../database/queries");
const db = require("../database/db");

const getEvents = async (req, res) => {
  try {
    const events = await db.query(queries.getEvents);
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.json(events);
  } catch (error) {
    console.log("Error at geting events", error);
    res.status(500).json({ message: "Error at geting events", error });
  }
}

const addEvent = async (req, res) => {
  try {
    const { name, description, date, category, subfolder} = req.body;
    const sub = subfolder || name;
    const cate = category || "events";
    const images = `uploads/${cate}/${sub}`;
    const result = await db.query(queries.addEvent, [name, description, images, date]);
    res.status(201).json({ message: "Event added successfully", eventId: result.insertId });
  }
  catch (error) {
    console.log("Error at adding event", error);
    res.status(500).json({ message: "Error at adding event", error });
  }
}
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.deleteEvent, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error at deleting event", error);
    res.status(500).json({ message: "Error at deleting event", error });
  }
}

module.exports = {
  addEvent,
  getEvents,
  deleteEvent
}