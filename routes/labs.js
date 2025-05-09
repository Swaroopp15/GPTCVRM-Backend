const { addLabs, getLabs, updateLab, deleteLab } = require('../controllers/labs');
const upload = require('../handlers/multer');

const router = require('express').Router();

router.post('/add', upload.fields([{name: 'lab_images', maxCount:12}]), addLabs);
router.get('/', getLabs);
router.put('/:id', upload.fields([{name: 'lab_images', maxCount:12}]),updateLab);
router.delete('/:id',deleteLab);


module.exports = router