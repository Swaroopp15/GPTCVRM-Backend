const { addEbook, updateEbook, deleteEbook } = require('../controllers/ebook');
const isAuthenticated = require('../controllers/isLogined');
const router = require('express').Router();

router.post('/', isAuthenticated, addEbook);
router.put("/", isAuthenticated, updateEbook);
router.delete("/:id", isAuthenticated, deleteEbook);

module.exports = router