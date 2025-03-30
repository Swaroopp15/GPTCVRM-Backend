const { addLabs, getLabs } = require('../controllers/labs');
const upload = require('../handlers/multer');

const router = require('express').Router();

router.post('/add', upload.fields([{name: 'lab_images', maxCount:12}]), addLabs);
router.get('/', getLabs);

module.exports = router