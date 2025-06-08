const express = require('express');
const { getAllResults, addResult, deleteResult, getAvailableYears, searchResult, addBulkResults } = require('../controllers/results');

const router = express.Router();

router.get('/get-results', getAllResults);
router.get('/get-years', getAvailableYears);
router.post('/', addResult);
router.delete('/:id', deleteResult);
router.get('/search',searchResult);
router.post('/bulk', addBulkResults);



module.exports = router;
