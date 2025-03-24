const express = require('express');
const { getAllPlacements, addPlacement, deletePlacement } = require('../controllers/placements');

const router = express.Router();

router.get('/:year', getAllPlacements);
router.post('/', addPlacement);
router.delete('/:year/:placement', deletePlacement);

module.exports = router;
