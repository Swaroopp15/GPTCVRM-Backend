const { getNotifications, addNotification, deleteNotification, updateNotification } = require('../controllers/notifications');

const Router = require('express').Router();

Router.get('/', getNotifications);
Router.post('/', addNotification);
Router.delete('/:id', deleteNotification);
Router.put('/:id', updateNotification);


module.exports = Router;