const db = require("../database/db");
const queries = require("../database/queries");

const getNotifications = async (req, res) => {
  try {
    const notifications = await db.query(queries.getNotifications);
    res.json(notifications[0]);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
}
const addNotification = async (req, res) => {
  try {
    const { title, date, link } = req.body;
    const isLink = link ? true : false;
    const result = await db.query(queries.addNotification, [
      title,
      date,
      isLink,
      link,
    ]);
    res.json({message : "Notification added successfully", result: result[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding notification", error });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(queries.deleteNotification, [id]);
    res.json({message : "Notification deleted successfully", result: result[0]});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting notification" , error});
  }
}

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, isLink, link } = req.body;
    const result = await db.query(queries.getNotificationById, [id]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }
    const updateResult = await db.query(queries.updateNotification, [
      title || null,
      date || null,
      isLink || null,
      link || null,
      id,
    ]);
    return res.status(200).json({ message: "Notification updated successfully" });
  }
  catch (error) {
    console.error("Error in updating notification", error);
    res.status(500).json({ message: "Failed to update notification", error });
  }
}

module.exports = {
  getNotifications,
  addNotification,
  deleteNotification,
  updateNotification,
};