const express = require('express');
const {
    getAllFaculty,
    getFacultyById,
    addFaculty,
    updateFaculty,
    deleteFaculty
} = require('../controllers/faculty');
const upload = require('../handlers/multer');

const router = express.Router();

router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);
router.post('/', upload.fields([{name: 'image', maxCount:1}]), addFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);

module.exports = router;
