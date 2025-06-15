const router = require('express').Router();
const { getStudents, getAdmissionYears, addNewStudent, studentsForResults, studentsForPlacements, deleteStudent, updateStudent, addStudentsBulk, getStudentsByYear } = require('../controllers/students');


router.get('/', getStudents);
router.get('/by-year', getStudentsByYear );
router.get('/admission-years', getAdmissionYears);
router.get('/for-results', studentsForResults);
router.get('/for-placements', studentsForPlacements);
router.post('/', addNewStudent);
router.post('/bulk', addStudentsBulk);
router.delete('/:pin', deleteStudent);
router.put("/:pin", updateStudent)

module.exports = router;