const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"],
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;