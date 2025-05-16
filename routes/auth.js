const router = require('express').Router();
const { register, login, isLoggedIn, logout } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/isLoggedIn', isLoggedIn)
router.get('/logout', logout)

module.exports = router;