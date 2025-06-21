const express = require('express');
const { getAllDepartments, addDepartment, deleteDepartment, updateDepartment, getDepartment } = require('../controllers/departments');
const isAuthenticated = require('../controllers/isLogined');

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:depo_code', getDepartment);
router.post('/', isAuthenticated, addDepartment);
router.put('/:depo_code', isAuthenticated, updateDepartment);
router.delete('/:depo_code', isAuthenticated, deleteDepartment);


module.exports = router;
