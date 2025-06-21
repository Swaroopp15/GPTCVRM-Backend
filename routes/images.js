const { getImages, addImage, deleteImage, updateImage } = require('../controllers/images');
const isAuthenticated = require('../controllers/isLogined');

const router = require('express').Router();

router.get('/', getImages);
router.post('/', isAuthenticated,  addImage);
router.delete('/:imageName', isAuthenticated,  deleteImage);
router.put('/', isAuthenticated,  updateImage)

module.exports = router;