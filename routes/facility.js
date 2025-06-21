const { getFacilities, addFacilities, updateFacility, deleteFacility } = require("../controllers/facilities");
const isAuthenticated = require("../controllers/isLogined");

const router = require("express").Router();

router.get("/", getFacilities);
router.post("/", isAuthenticated, addFacilities);
router.put("/:id", isAuthenticated, updateFacility);
router.delete("/:id", isAuthenticated, deleteFacility);

module.exports = router