const { getImages, addImage, deleteImage, updateImage } = require('../controllers/images');

const router = require('express').Router();

router.get('/', getImages);
router.post('/', addImage);
router.delete('/:imageName', deleteImage);
router.put('/', updateImage)

module.exports = router;