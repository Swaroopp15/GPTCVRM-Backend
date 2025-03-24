const express = require('express');
const { getAllDepartments, addDepartment, deleteDepartment, updateDepartment, getDepartment } = require('../controllers/departments');

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:depo_code', getDepartment);
router.post('/', addDepartment);
router.put('/:depo_code', updateDepartment);
router.delete('/:depo_code', deleteDepartment);


module.exports = router;
