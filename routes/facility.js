const { getFacilities, addFacilities, updateFacility, deleteFacility } = require("../controllers/facilities");

const router = require("express").Router();

router.get("/", getFacilities);
router.post("/",addFacilities);
router.put("/:id", updateFacility);
router.delete("/:id", deleteFacility);

module.exports = router