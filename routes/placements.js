const express = require('express');
const { getAllPlacements, addPlacement, deletePlacement, getPlacements, getPlacementYears, getAllPlacement,addPlacementsBulk } = require('../controllers/placements');

const router = express.Router();

router.get('/getPlacements/:year', getAllPlacements);
router.get("/all", getAllPlacement);
router.get('/years', getPlacementYears);
router.get("/:depo_code/:year", getPlacements);
router.post('/', addPlacement);
router.delete('/:id', deletePlacement);
router.post('/bulk', addPlacementsBulk);

module.exports = router;
