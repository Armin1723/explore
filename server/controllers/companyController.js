const { Company } = require("../models/companyModel");
const fs = require("fs");
const User = require("../models/userModel");

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

    if (
      !name ||
      !email ||
      !subCategory.length ||
      !description ||
      !admin ||
      !category ||
      !address ||
      !website ||
      !number
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, write again.",
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
    if (res.files && res.files?.logo) {
      const { logo } = res.files;
      if (logo) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            logo[0].pathath,
            { folder: "Company_Logo" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res
              .status(500)
              .json({
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
            .json({ success: false, message: "Failed to upload logo" });
        }
      }
    }

    const company = await Company.create(companyData);
    await User.findByIdAndUpdate(admin, { company: company._id });
    const updatedUser = await User.findById(admin, {
      password: 0,
    });
    res.status(201).json({ success: true, user: updatedUser });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editCompany = async (req, res) => {};

const getCompanyDetails = async (req, res) => {};

const getCompaniesBySubCategory = async (req, res) => {};

module.exports = {
  registerCompany,
  editCompany,
  getCompanyDetails,
  getCompaniesBySubCategory,
};
