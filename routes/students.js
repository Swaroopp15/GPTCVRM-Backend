const router = require('express').Router();
const isAuthenticated = require('../controllers/isLogined');
const { getStudents, getAdmissionYears, addNewStudent, studentsForResults, studentsForPlacements, deleteStudent, updateStudent, addStudentsBulk, getStudentsByYear } = require('../controllers/students');


router.get('/', getStudents);
router.get('/by-year', getStudentsByYear );
router.get('/admission-years', getAdmissionYears);
router.get('/for-results', studentsForResults);
router.get('/for-placements', studentsForPlacements);
router.post('/', isAuthenticated, addNewStudent);
router.post('/bulk', isAuthenticated, addStudentsBulk);
router.delete('/:pin', isAuthenticated, deleteStudent);
router.put("/:pin", isAuthenticated, updateStudent)

module.exports = router;