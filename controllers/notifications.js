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
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding notification", error });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(queries.deleteNotification, [id]);
    res.json(result[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting notification" , error});
  }
}

module.exports = {
  getNotifications,
  addNotification,
  deleteNotification,
};