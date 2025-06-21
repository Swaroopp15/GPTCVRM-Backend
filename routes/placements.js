const express = require('express');
const { getAllPlacements, addPlacement, deletePlacement, getPlacements, getPlacementYears, getAllPlacement,addPlacementsBulk } = require('../controllers/placements');
const isAuthenticated = require('../controllers/isLogined');

const router = express.Router();

router.get('/getPlacements/:year', getAllPlacements);
router.get("/all", getAllPlacement);
router.get('/years', getPlacementYears);
router.get("/:depo_code/:year", getPlacements);
router.post('/', isAuthenticated, addPlacement);
router.delete('/:id', isAuthenticated, deletePlacement);
router.post('/bulk', isAuthenticated, addPlacementsBulk);

module.exports = router;
