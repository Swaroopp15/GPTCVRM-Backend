const express = require('express');
const { getCollegeInfo, setInfo, addInfo, addImage } = require('../controllers/college');
const isAuthenticated = require('../controllers/isLogined');

const router = express.Router();

router.get('/', getCollegeInfo);
router.put('/',isAuthenticated, setInfo);
router.post('/',isAuthenticated, addInfo);
router.post("/image",isAuthenticated, addImage);

module.exports = router;
