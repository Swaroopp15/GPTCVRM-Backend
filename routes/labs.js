const { addLabs, getLabs, updateLab, deleteLab } = require('../controllers/labs');
const upload = require('../handlers/multer');

const router = require('express').Router();

router.post('/add', addLabs);
router.get('/', getLabs);
router.put('/:id',updateLab);
router.delete('/:id',deleteLab);


module.exports = router