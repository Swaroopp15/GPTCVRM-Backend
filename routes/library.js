const { getLibrary, addLibrary, deleteLibrary } = require('../controllers/library');

const router = require('express').Router();

router.get("/", getLibrary);
router.post("/", addLibrary);
router.delete("/", deleteLibrary);


module.exports = router;