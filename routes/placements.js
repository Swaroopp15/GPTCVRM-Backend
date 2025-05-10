const express = require('express');
const { getAllPlacements, addPlacement, deletePlacement, getPlacements, getPlacementYears } = require('../controllers/placements');

const router = express.Router();

router.get('/getPlacements/:year', getAllPlacements);
router.get('/years', getPlacementYears);
router.get("/:depo_code/:year", getPlacements);
router.post('/', addPlacement);
router.delete('/:id', deletePlacement);

module.exports = router;
