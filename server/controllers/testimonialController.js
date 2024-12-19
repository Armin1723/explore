const Testimonial = require("../models/testimonialModel");

const getTestimonials = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const sort = req.query.sort;

    const limit = 10;
    const skip = (page - 1) * limit;

    let query = Testimonial.find().skip(skip).limit(limit);

    if (sort === "popular") {
      query = query.sort({ rating: -1 }); 
    }

    const testimonials = await query;
    const total = await Testimonial.countDocuments();

    const hasMore = total > page * limit;

    res.status(200).json({ success: true, testimonials, hasMore });
};

const addTestimonial = async (req, res) => {
    const { name, email, phone, rating, message } = req.body;
        if(!name || !email || !phone || !rating || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const testimonial = new Testimonial({
            name,
            email,
            phone,
            rating,
            message,
        });

        await testimonial.save();

        res.status(201).json({ success: true, message: "Testimonial added" });
}

module.exports = { getTestimonials, addTestimonial };