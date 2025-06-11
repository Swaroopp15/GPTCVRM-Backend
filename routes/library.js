const { getLibrary, addLibrary, deleteLibrary, updateBook } = require('../controllers/library');

const router = require('express').Router();

router.get("/", getLibrary);
router.post("/", addLibrary);
router.delete("/:id", deleteLibrary);
router.put("/", updateBook)


module.exports = router;