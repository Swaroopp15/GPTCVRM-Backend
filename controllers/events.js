const queries = require("../database/queries");
const db = require("../database/db");
const path = require("path");
const fs = require("fs");

const getEvents = async (req, res) => {
  try {
    const events = await db.query(queries.getEvents);
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    const eventsWithImages = events[0].map(event => {
          const eventFolderPath = path.join(process.cwd(), "public", event.images);          
          let imageUrls = [];
          try {
            if (fs.existsSync(eventFolderPath)) {
              const files = fs.readdirSync(eventFolderPath);
              imageUrls = files.map(file =>  event.images+ "/"+ file);
            }
          } catch (err) {
            console.error(`Error fetching images for ${event.images}:`, err);
          }
    
          return { ...event, images: imageUrls };
        }
    );
    res.json(eventsWithImages);
  } catch (error) {
    console.log("Error at geting events", error);
    res.status(500).json({ message: "Error at geting events", error });
  }
}

const addEvent = async (req, res) => {
  try {
    const { name, description, date, category, subfolder} = req.body;
    if (!name || !description || !date) {
      return res.status(400).json({ message: "Name, description, and date are required" });
    }
    const newDate = new Date(date.split("-").reverse().join("-"));
    if (isNaN(newDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const sub = subfolder || name;
    const cate = category || "events";
    const images = `uploads/${cate}/${sub.split(" ").join("-")}`;
    const result = await db.query(queries.addEvent, [name, description, images, newDate]);
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

const updateEvent = async (req, res) => {
  try{
    const {id} = req.params;
    const result = await db.query(queries.getEventById, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    const newEvent = req.body;
    const sub =  newEvent.subfolder || newEvent.name;
    const images = `uploads/${newEvent.category || "events"}/${sub.split(" ").join("-")}`;
    const updateResult = await db.query(queries.updateEvent, [
      newEvent.title || null,
      newEvent.title || null,
      newEvent.title || null,
      newEvent.description || null,
      newEvent.description || null,
      newEvent.description || null,
      images,
      images,
      images,
      newEvent.event_date || null,
      newEvent.event_date || null,
      newEvent.event_date || null,
      id
    ]);
    return res.status(200).json({ message: "Event updated successfully" });
  }catch(error) {
    console.log('Error in updating event');
    res.status(500).json({message: 'Failed to update Event', error});
  }
}

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
}