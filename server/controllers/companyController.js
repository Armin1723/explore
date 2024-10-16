const Company = require("../models/companyModel");
const fs = require("fs");
const User = require("../models/userModel");
const cloudinary = require("../helpers/cloudinaryConfig");

const { Parser } = require("json2csv");

//Add a company
const registerCompany = async (req, res) => {
  try {
    const {
      name,
      email,
      subCategory,
      description,
      admin,
      category,
      address,
      website,
      number,
    } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!category) missingFields.push("category");
    if (!subCategory.length) missingFields.push("subCategory");
    if (!description) missingFields.push("description");
    if (!admin) missingFields.push("admin");
    if (!address) missingFields.push("address");
    if (!website) missingFields.push("website");
    if (!number) missingFields.push("number");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    const alreadyHasCompany = await User.findOne({ company: { $exists: true } });
    if (alreadyHasCompany) {
      return res.status(400).json({
        success: false,
        message: "You already have a company registered",
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    const companyData = {
      name,
      email,
      subCategory,
      description,
      admin,
      category,
      address,
      website,
      phone: {
        number,
        isVisible: false,
      },
    };

    // Handling Logo Upload to cloudinary
    if (req.files && req.files?.logo) {
      const { logo } = req.files;
      if (logo) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            logo[0].path,
            { folder: "Company_Logo" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({
              success: false,
              message: "Failed to upload logo to cloud.",
            });
          }
          companyData.logo = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
          fs.unlink(logo[0].path, (err) => {
            if (err) {
              console.error("Failed to delete temporary logo file:", err);
            }
          });
        } catch (error) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Failed to upload logo",
              error: error.message,
            });
        }
      }
    }

    const company = await Company.create(companyData);
    await User.findByIdAndUpdate(admin, { company: company._id });
    const updatedUser = await User.findById(admin, {
      password: 0,
    });
    res.status(201).json({ success: true, user: updatedUser, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Edit a company
const editCompany = async (req, res) => {
  try {
    const { companyData, userId } = req.body;

    const { name } = userData;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }
    const company = await Company.findOne({ name });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    if (company.admin.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to edit this company",
        });
    }

    const updatedCompany = await Company.findOneAndUpdate(
      { name },
      companyData,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, company: updatedCompany });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch a single company detail by name
const getCompanyDetails = async (req, res) => {
  try {
    const { name } = req.params;
    const company = await Company.findOne({ name });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch companies (with option of category search) with pagination
const getCompanies = async (req, res) => {
  try {
    let { category } = req.params;
    let { page } = req.query;

    if (!page) page = 1;

    if (category === "all") {
      category = { $exists: true };
    }

    const companies = await Company.find({ category })
      .limit(10)
      .skip((page - 1) * 10);
    const totalCompanies = await Company.countDocuments({ category });
    res
      .status(200)
      .json({
        success: true,
        user: req.user,
        companies,
        totalCompanies,
        category,
        pages: Math.ceil(totalCompanies / 10),
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch companies by subcategory with pagination
const getCompaniesBySubCategory = async (req, res) => {
  try {
    let { subCategory } = req.params;
    let { page } = req.query;

    if (!page) page = 1;

    if (subCategory === "all") {
      subCategory = { subCategory: { $exists: true } };
    } else {
      subCategory = { subCategory: { $in: [subCategory] } };
    }

    const companies = await Company.find(subCategory)
      .limit(10)
      .skip((page - 1) * 10);
    const totalCompanies = await Company.countDocuments(subCategory);
    res.status(200).json({
      success: true,
      companies,
      totalCompanies,
      subCategory: req.params.subCategory,
      pages: Math.ceil(totalCompanies / 10),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Export companies to CSV
const exportCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});

    const modifiedCompanies = companies.map((company) => ({
      _id: company._id,
      name: company.name,
      email: company.email,
      address: company.address,
      phone: company.phone.number,
      description: company.description,
    }));

    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found to export" });
    }

    const fields = ["_id", "name", "email", "address", "phone", "description"];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(modifiedCompanies);

    res.header("Content-Type", "text/csv");
    res.attachment("companies.csv");

    res.send(csv);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "An error occurred while exporting data",
        error: err.message,
      });
  }
};

//Search companies by substring in name or description
const searchCompanies = async (req, res) => {
  try {
    const { query } = req.params;
    let { page } = req.query;

    if (!page) page = 1;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const companies = await Company.find({
      $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      ],
    }).limit(10).skip((page - 1) * 10);

    const totalCompanies = await Company.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      companies,
      totalCompanies,
      query,
      pages: Math.ceil(totalCompanies / 10),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerCompany,
  editCompany,
  getCompanyDetails,
  getCompanies,
  getCompaniesBySubCategory,
  exportCompanies,
  searchCompanies,
};
