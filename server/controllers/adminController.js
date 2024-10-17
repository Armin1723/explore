const { Parser } = require("json2csv");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Review = require("../models/reviewModel");

//Get all users with pagination
const getUsers = async (req, res) => {
  try {
    let { page, category, subCategory } = req.query;

    if (!page) page = 1;

    let query = { role: "user", isActive: true };

    if (category) {
      query.category = category;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }

    const users = await User.find(query)
      .populate("company")
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);

      const totalUsers = await User.countDocuments(query);  

    res.status(200).json({ success: true, users, page, totalPages: Math.ceil(totalUsers / 10) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all companies with pagination
const getCompanies = async (req, res) => {
  try {
    let { page, category, subCategory } = req.query;

    if (!page) page = 1;

    let query = {status: "active"};

    if (category) {
      query.category = category;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }

    const companies = await Company.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);

      const totalCompanies = await Company.countDocuments(query);

    res.status(200).json({ success:true, companies, page, totalPages: Math.ceil(totalCompanies / 10) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Export companies to CSV
const exportCompanies = async (req, res) => {
  try {
    let { category } = req.query;
    if (!category) {
      category = { $exists: true };
    }

    const companies = await Company.find({ category });

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
    res.attachment("companies.csv");

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
    ]);

    const totalReviews = await Review.find().countDocuments();

    res.status(200).json({ success:true, reviews, page, totalPages: Math.ceil(totalReviews / 20) });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
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
    res.status(200).json({ message , user});
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

module.exports = {
  getUsers,
  getCompanies,
  getReviewsSortedByFlags,
  exportCompanies,
  toggleSuspendUser,
  toggleSuspendCompany,
  getSuspendedUsers,
  getSuspendedCompanies,
};
