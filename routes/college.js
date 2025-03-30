const express = require('express');
const { getCollegeInfo, setInfo, addInfo } = require('../controllers/college');

const router = express.Router();

router.get('/', getCollegeInfo);
router.put('/', setInfo);
router.post('/', addInfo);

module.exports = router;
