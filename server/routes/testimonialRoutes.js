const { getTestimonials, addTestimonial } = require('../controllers/testimonialController');

const router = require('express').Router();

router.get('/', getTestimonials);
router.post('/', addTestimonial);

module.exports = router;