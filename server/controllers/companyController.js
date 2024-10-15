const Company = require("../models/companyModel");
const fs = require("fs");
const User = require("../models/userModel");
const cloudinary = require('../helpers/cloudinaryConfig')

const { Parser } = require('json2csv'); 

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
        message: `The following fields are required: ${missingFields.join(", ")}`,
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
            .json({ success: false, message: "Failed to upload logo" , error: error.message});
        }
      }
    }

    const company = await Company.create(companyData);
    await User.findByIdAndUpdate(admin, { company: company._id });
    const updatedUser = await User.findById(admin, {
      password: 0,
    });
    res.status(201).json({ success: true, user: updatedUser , company})

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editCompany = async (req, res) => {};

const getCompanyDetails = async (req, res) => {
  try{
    res.status(200).json({ success: true, cookie: req.cookies});
    // const { name } = req.params;
    // const company = await Company.findOne({ name });
    // if (!company) {
    //   return res.status(404).json({ success: false, message: "Company not found" });
    // }
    // res.status(200).json({ success: true, company });
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try{
    let { category } = req.params;
    let { page } = req.query;

    if(!page) page = 1;
    
    const companies = await Company.find({ category }).limit(10).skip((page - 1) * 10);
    const totalCompanies = await Company.countDocuments({ category });
    res.status(200).json({ success: true, companies, totalCompanies, pages: Math.ceil(totalCompanies / 10)});
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompaniesBySubCategory = async (req, res) => {};

const exportCompanies = async (req, res) =>{
  try {
    const companies = await Company.find({}); 

    const modifiedCompanies = companies.map((company) => ({
      _id: company._id,
      name: company.name,
      email: company.email,
      address: company.address,
      phone: company.phone.number, 
      description: company.description
    }));
    
    if (companies.length === 0) {
      return res.status(404).json({ message: 'No companies found to export' });
    }

    const fields = ['_id', 'name', 'email', 'address', 'phone', 'description']; 
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(modifiedCompanies);

    res.header('Content-Type', 'text/csv');
    res.attachment('companies.csv'); 

    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while exporting data' , error: err.message});
  }
}


module.exports = {
  registerCompany,
  editCompany,
  getCompanyDetails,
  getCompanies,
  getCompaniesBySubCategory,
  exportCompanies
};
