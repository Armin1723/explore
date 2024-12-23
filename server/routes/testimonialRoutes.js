const { getTestimonials, addTestimonial } = require('../controllers/testimonialController');
const {asyncHandler} = require('../utils');

const router = require('express').Router();

router.get('/', asyncHandler(getTestimonials));
router.post('/', asyncHandler(addTestimonial));

module.exports = router;