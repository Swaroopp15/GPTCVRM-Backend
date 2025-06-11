const { addEbook, updateEbook, deleteEbook } = require('../controllers/ebook');
const router = require('express').Router();

router.post('/', addEbook);
router.put("/", updateEbook);
router.delete("/:id", deleteEbook);

module.exports = router