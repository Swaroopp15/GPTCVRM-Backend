const express = require('express');
const { getAllResults, addResult, deleteResult, getAvailableYears, searchResult, addBulkResults } = require('../controllers/results');
const isAuthenticated = require('../controllers/isLogined');

const router = express.Router();

router.get('/get-results', getAllResults);
router.get('/get-years', getAvailableYears);
router.get('/search',searchResult);
router.post('/', isAuthenticated, addResult);
router.delete('/:student_id', isAuthenticated, deleteResult);
router.post('/bulk', isAuthenticated, addBulkResults);



module.exports = router;
