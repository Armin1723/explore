const { Parser } = require("json2csv");
const Company = require("../../models/companyModel");
const { sendMail } = require("../../helpers");

//Get all companies with pagination
const getCompanies = async (req, res) => {
    let { page, category, subCategory, limit = 10 } = req.query;

    if (!page) page = 1;

    let query = { status: "active" };

    if (category && category.toLowerCase() !== "all") {
      query.category = category.toLowerCase();
    }

    if (subCategory && subCategory.toLowerCase() !== "all") {
      query.subCategory = { $in: [subCategory.toLowerCase()] };
    }
    const companies = await Company.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCompanies = await Company.countDocuments(query);

    res.status(200).json({
      success: true,
      companies,
      page,
      totalPages: Math.ceil(totalCompanies / 10),
    });
};

//Export companies to CSV
const exportCompanies = async (req, res) => {
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
};

// Suspend a company
const toggleSuspendCompany = async (req, res) => {
    const { companyId } = req.body;
    const company = await Company.findById(companyId).populate({
      path: "reviews",
      populate: { path: "user" },
      limit: 5,
    });

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
};

//Get all suspended companies with pagination
const getSuspendedCompanies = async (req, res) => {
    let { page, limit = 10 } = req.query;

    if (!page) page = 1;

    const companies = await Company.find({ status: "suspended" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ companies });
};

//Get recent company
const getRecentCompany = async (req, res) => {
    const company = await Company.findOne({ status: "pending" }).sort({
      createdAt: -1,
    });
    if (!company) {
      return res
        .status(200)
        .json({ success: true, message: "No pending company found" });
    }
    res.status(200).json({ success: true, company });
};

//Get All Requests with pagination
const getRequests = async (req, res) => {
    let { page, limit = 10} = req.query;

    if (!page) page = 1;

    const companies = await Company.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRequests = await Company.countDocuments({ status: "pending" });

    res
      .status(200)
      .json({
        success: true,
        companies,
        page,
        totalPages: Math.ceil(totalRequests / 10),
      });
};

//Handle requests
const handleRequest = async (req, res) => {
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

    //send mail to company
    const subject =
      action === "approve" ? "Company approved" : "Company rejected";
    const message =
      action === "approve"
        ? `Dear ${company.name},\n\nWe are pleased to inform you that your company has been approved and is now active on our platform. You can now access all the features and start engaging with users.\n\nBest regards,\nThe Team`
        : `Dear ${company.name},\n\nWe regret to inform you that your company has been rejected. Please review the submission guidelines and make the necessary changes before resubmitting.\n\nBest regards,\nThe Team`;
    sendMail(company.email, subject, message);

    res.status(200).json({ success: true, company });
};

module.exports = {
    getCompanies,
    exportCompanies,
    toggleSuspendCompany,
    getSuspendedCompanies,
    getRecentCompany,
    getRequests,
    handleRequest,
};