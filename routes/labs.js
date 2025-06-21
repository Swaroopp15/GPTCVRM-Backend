const isAuthenticated = require('../controllers/isLogined');
const { addLabs, getLabs, updateLab, deleteLab } = require('../controllers/labs');
const upload = require('../handlers/multer');

const router = require('express').Router();

router.get('/', getLabs);
router.post('/add',isAuthenticated,  addLabs);
router.put('/:id',isAuthenticated, updateLab);
router.delete('/:id',isAuthenticated, deleteLab);


module.exports = router