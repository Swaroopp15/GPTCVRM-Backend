const express = require('express');
const { getAllResults, addResult, deleteResult, getAvailableYears } = require('../controllers/results');

const router = express.Router();

router.get('/get-results', getAllResults);
router.get('/get-years', getAvailableYears);
router.post('/', addResult);
router.delete('/:id', deleteResult);


module.exports = router;
