const express = require('express');
const {
    getAllFaculty,
    getFacultyById,
    addFaculty,
    updateFaculty,
    deleteFaculty
} = require('../controllers/faculty');
const upload = require('../handlers/multer');
const isAuthenticated = require('../controllers/isLogined');

const router = express.Router();

router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);
router.post('/', isAuthenticated, addFaculty);
router.put('/:id', isAuthenticated, updateFaculty);
router.delete('/:id', isAuthenticated, deleteFaculty);

module.exports = router;
