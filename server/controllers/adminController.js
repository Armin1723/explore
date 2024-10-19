const { Parser } = require("json2csv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Review = require("../models/reviewModel");

//Login as admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    if (user.isVerified === false) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your email" });
    }
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "You don't have admin priveleges." });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    user.password = undefined;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
  }
};

//Logout as admin
const logoutAdmin = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
  }
};

//Get all users with pagination
const getUsers = async (req, res) => {
  try {
    let { page} = req.query;

    if (!page) page = 1;

    let query = { role: "user", isActive: true };

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);

    const totalUsers = await User.countDocuments(query);

    res
      .status(200)
      .json({
        success: true,
        users,
        page,
        totalPages: Math.ceil(totalUsers / 10),
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all companies with pagination
const getCompanies = async (req, res) => {
  try {
    let { page, category, subCategory } = req.query;

    if (!page) page = 1;

    let query = { status: "active" };

    if (category && category !== "all") {
      query.category = category.toLowerCase();
    }

    if (subCategory && subCategory !== "all") {
      query.subCategory = subCategory.toLowerCase();
    }

    const companies = await Company.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);


    const totalCompanies = await Company.countDocuments(query);

    res
      .status(200)
      .json({
        success: true,
        companies,
        page,
        totalPages: Math.ceil(totalCompanies / 10),
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Export companies to CSV
const exportCompanies = async (req, res) => {
  try {
    let { category, subCategory } = req.query;

    let query = { status: "active" };

    if (category && category !== "all") {
      query.category = category.toLowerCase();
    }

    if (subCategory && subCategory !== "all") {
      query.subCategory = subCategory.toLowerCase();
    }

    const companies = await Company.find(query).sort({ createdAt: -1 });

    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found to export" });
    }

    const fields = [
      "_id",
      "name",
      "email",
      "address",
      "phone",
      "description",
      "logo",
      "website",
      "category",
      "subCategory",
      "admin",
      "createdAt",
    ];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(companies);

    res.header("Content-Type", "text/csv");
    res.attachment(`companies-${req.query.category}.csv`);

    res.send(csv);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while exporting data",
      error: err.message,
    });
  }
};

//Get all reviews sorted by flags
const getReviewsSortedByFlags = async (req, res) => {
  try {
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

    res
      .status(200)
      .json({
        success: true,
        reviews,
        page,
        totalPages: Math.ceil(totalReviews / 20),
      });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

//Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params; 
    const review = await Review.findById(reviewId.toString())
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const company = await Company.findById(review.company);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    company.reviews = company.reviews.filter((id) => id.toString() !== reviewId);
    await company.save();

    await review.deleteOne();

    res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Suspend a user
const toggleSuspendUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();
    message = user.isActive ? "User activated" : "User deactivated";
    res.status(200).json({ message, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Suspend a company
const toggleSuspendCompany = async (req, res) => {
  try {
    const { companyId } = req.body;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.status = company.status === "active" ? "suspended" : "active";
    await company.save();

    const message =
      company.status === "active"
        ? "Company activated successfully"
        : "Company suspended successfully";
    res.status(200).json({ message, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all suspended users with pagination
const getSuspendedUsers = async (req, res) => {
  try {
    let { page } = req.query;

    if (!page) page = 1;

    const users = await User.find({ isActive: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all suspended companies with pagination
const getSuspendedCompanies = async (req, res) => {
  try {
    let { page } = req.query;

    if (!page) page = 1;

    const companies = await Company.find({ status: "suspended" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Handle requests
const handleRequest = async (req, res) => {
  try {
    const { action, companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (action === "approve") {
      company.status = "active";
    }
    if (action === "reject") {
      company.status = "suspended";
    }
    await company.save();
    res.status(200).json({ success: true, company });
  }
  catch (error) {
    res.status(500).json({ success:false, message: error.message });
  }
};

//Get recent company
const getRecentCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ status: "pending" }).sort({ createdAt: -1 });
    if (!company) {
      return res.status(200).json({success:true, message: "No pending company found"});
    }
    res.status(200).json({ success: true, company });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//Get All Requests with pagination
const getRequests = async (req, res) => {

  try {
    let { page } = req.query;

    if (!page) page = 1;


    const companies = await Company.find({ status: "pending" }).sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10);

    const totalRequests = await Company.countDocuments({ status: "pending" });

    res.status(200).json({ success: true, companies, page, totalPages: Math.ceil(totalRequests / 10) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  loginAdmin,
  logoutAdmin,
  getUsers,
  getCompanies,
  getReviewsSortedByFlags,
  deleteReview,
  exportCompanies,
  toggleSuspendUser,
  toggleSuspendCompany,
  getSuspendedUsers,
  getSuspendedCompanies,
  getRecentCompany,
  handleRequest,
  getRequests,
};
