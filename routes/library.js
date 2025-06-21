const isAuthenticated = require('../controllers/isLogined');
const { getLibrary, addLibrary, deleteLibrary, updateBook } = require('../controllers/library');

const router = require('express').Router();

router.get("/", getLibrary);
router.post("/", isAuthenticated, addLibrary);
router.delete("/:id", isAuthenticated, deleteLibrary);
router.put("/", isAuthenticated, updateBook)


module.exports = router;