const express = require('express');
const { getCollegeInfo, setInfo, addInfo, addImage } = require('../controllers/college');

const router = express.Router();

router.get('/', getCollegeInfo);
router.put('/', setInfo);
router.post('/', addInfo);
router.post("/image", addImage);

module.exports = router;
