const { getNotifications, addNotification, deleteNotification } = require('../controllers/notifications');

const Router = require('express').Router();

Router.get('/', getNotifications);
Router.post('/', addNotification);
Router.delete('/:id', deleteNotification);

module.exports = Router;