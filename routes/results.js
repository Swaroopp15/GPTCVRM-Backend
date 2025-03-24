const express = require('express');
const { getAllResults, addResult, deleteResult } = require('../controllers/results');

const router = express.Router();

router.get('/:year', getAllResults);
router.post('/', addResult);
router.delete('/:id', deleteResult);


module.exports = router;
