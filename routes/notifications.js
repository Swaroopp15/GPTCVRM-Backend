const isAuthenticated = require('../controllers/isLogined');
const { getNotifications, addNotification, deleteNotification, updateNotification } = require('../controllers/notifications');

const Router = require('express').Router();

Router.get('/', getNotifications);
Router.post('/', isAuthenticated, addNotification);
Router.delete('/:id', isAuthenticated, deleteNotification);
Router.put('/:id', isAuthenticated, updateNotification);


module.exports = Router;