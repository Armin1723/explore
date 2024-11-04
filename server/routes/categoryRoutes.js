const { getCategories, createCategory } = require('../controllers/categoryController');
const { isAdmin } = require('../middlewares');

const router = require('express').Router();

router.get('/', getCategories);
router.post('/',isAdmin, createCategory);

module.exports = router;
