const express = require('express');
const { getCollegeInfo } = require('../controllers/college');

const router = express.Router();

router.get('/', getCollegeInfo);

module.exports = router;
