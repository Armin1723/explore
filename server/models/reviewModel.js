const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"],
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Please provide a company"],
    },
    flags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: [true, "Please provide a review"],
    },
},{
    timestamps: true,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;