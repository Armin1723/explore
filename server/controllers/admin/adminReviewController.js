const Company = require("../../models/companyModel");
const Review = require("../../models/reviewModel");

//Get all reviews sorted by flags
const getReviewsSortedByFlags = async (req, res) => {
  let { page } = req.query;

  if (!page) page = 1;

  const reviews = await Review.aggregate([
    {
      $addFields: {
        flagCount: { $size: "$flags" },
      },
    },
    {
      $sort: { flagCount: -1 },
    },
    {
      $skip: (page - 1) * 20,
    },
    {
      $limit: 20,
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $unwind: "$company",
    },
  ]);

  const totalReviews = await Review.find().countDocuments();

  res.status(200).json({
    success: true,
    reviews,
    page,
    totalPages: Math.ceil(totalReviews / 20),
  });
};

//Delete a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId.toString());
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  const company = await Company.findById(review.company);
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  await review.deleteOne();

  const reviews = await Review.find({ company: company._id });

  // Calculate new rating
  if (reviews.length > 0) {
    company.rating =
      (company.rating * (reviews.length + 1) - review.rating) /
      reviews.length;
  } else {
    company.rating = 0;
  }

  await company.save();

  res.status(200).json({ message: "Review deleted successfully" });
};

module.exports = { getReviewsSortedByFlags, deleteReview };
