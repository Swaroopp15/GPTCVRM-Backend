const queries = require("../database/queries");
const db = require("../database/db");
const path = require("path");
const fs = require("fs");
const fileSaver = require("../utilities/fileSaver");


const getEvents = async (req, res) => {
  try {
    const events = await db.query(queries.getEvents);
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    const eventsWithImages = events[0].map((event) => {
      const eventFolderPath = path.join(process.cwd(), "public", event.images);
      let imageUrls = [];
      try {
        if (fs.existsSync(eventFolderPath)) {
          const files = fs.readdirSync(eventFolderPath);
          imageUrls = files.map((file) => event.images + "/" + file);
        }
      } catch (err) {
        console.error(`Error fetching images for ${event.images}:`, err);
      }

      return { ...event, images: imageUrls };
    });
    res.json(eventsWithImages);
  } catch (error) {
    console.log("Error at geting events", error);
    res.status(500).json({ message: "Error at geting events", error });
  }
};

const addEvent = async (req, res) => {
  try {
    const { name, description, date } = req.body;

    if (!name || !description || !date) {
      return res.status(400).json({ message: "Name, description, and date are required" });
    }

    const newDate = new Date(date.split("-").reverse().join("-"));
    if (isNaN(newDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const folder = `events/${name.toLowerCase().split(" ").join("-")}`;
    const uploadedImages = [];

    if (req.files?.event_images) {
      const eventImages = Array.isArray(req.files.event_images)
        ? req.files.event_images
        : [req.files.event_images];

      for (const image of eventImages) {
        const savedPath = await fileSaver(image, image.name.split(".")[0], folder);
        uploadedImages.push(savedPath);
      }
    }

    const result = await db.query(queries.addEvent, [
      name,
      description,
      folder, // Save folder path
      newDate,
    ]);

    res.status(201).json({
      message: "Event added successfully",
      eventId: result.insertId,
      images: uploadedImages,
    });
  } catch (error) {
    console.log("Error adding event:", error);
    res.status(500).json({ message: "Error adding event", error });
  }
};


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
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(queries.getEventById, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    const newEvent = req.body;
    const images = result[0].images;
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
      id,
    ]);
    // only executed if new images are sent
    if (req.files?.event_images) {
      // creating new path   
      const imagePath = path.join(process.cwd(), "public", images);
      if (fs.existsSync(imagePath)) {
        fs.rmSync(imagePath, {recursive: true, force: true})
        fs.mkdirSync(imagePath, { recursive: true });
      }
      // checking if event_images is array, if not an array then converting it into an array :- 
      // If from frontend we only send a single image it will be sent as an object not as array
      // so we convert the object into an array with single element, if multiple images are sent there is
      // no problem here, as event_images will be in a array format
      const eventImages = Array.isArray(req.files.event_images) ? req.files.event_images : [req.files.event_images];
      // Adding images to new path
      eventImages.forEach((image) => {
        const pathh = path.join(imagePath, image.name);
        image.mv(pathh, (err) => {
          if (!err) return;
          console.log("Error in saving event image : ", err);
        });
      });
      
    }

    return res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.log("Error in updating event",error);
    res.status(500).json({ message: "Failed to update Event", error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.getEventById, [id]);

    if (result.length === 0 || result[0].length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = result[0][0];
    const eventFolderPath = path.join(process.cwd(), "public", event.images);
    let imageUrls = [];

    try {
      if (fs.existsSync(eventFolderPath)) {
        const files = fs.readdirSync(eventFolderPath);
        imageUrls = files.map((file) => event.images + "/" + file);
      }
    } catch (err) {
      console.error(`Error fetching images for ${event.images}:`, err);
    }

    const eventWithImages = {
      ...event,
      images: imageUrls,
      // Add additional formatted date fields if needed
      formatted_date: new Date(event.event_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
      iso_date: new Date(event.event_date).toISOString(),
    };

    res.json(eventWithImages);
  } catch (error) {
    console.log("Error getting event by ID:", error);
    res.status(500).json({
      message: "Error getting event",
      error: error.message,
    });
  }
};

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getEventById,
};
