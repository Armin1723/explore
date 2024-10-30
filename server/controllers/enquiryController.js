const Company = require("../models/companyModel");
const Enquiry = require("../models/enquiryModel");
const User = require("../models/userModel");

//Fetch Enquiries of a company with pagination
const getEnquiries = async (req, res) => {
  try {
    const { companyId } = req.params;
    let { page } = req.query;

    if (!page) page = 1;

    const { user } = req.user;

    const company = await Company.findOne(
      { _id: companyId },
      { enquiries: 1 }
    ).populate({
      path: "enquiries",
      select: "message user status",
      populate: {
        path: "user",
        select: "name profilePic",
      },
      limit: 20,
      skip: (page - 1) * 20,
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    if (company.user.toString() !== user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to view this page",
        });
    }

    const totalEnquiries = await Company.findOne({
      _id: companyId,
    }).countDocuments("enquiries");

    res.status(200).json({
      success: true,
      enquiries: company.enquiries,
      page,
      totalPages: Math.ceil(totalEnquiries / 20),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch a single enquiry
const getSingleEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id).populate({
      path: "user",
      select: "name profilePic",
    });

    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Send response to an enquiry
const sendResponse = async (req, res) => {
  try {
    const { enquiryId, response } = req.body;

    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    enquiry.response = response;
    enquiry.status = "approved";
    await enquiry.save();

    res
      .status(200)
      .json({ success: true, message: "Response sent successfully", enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Send an enquiry
const sendEnquiry = async (req, res) => {
  try {
    const { companyName, message } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    const enquiry = await Enquiry.create({
      company: company._id,
      user: id,
      message,
    });

    if (company.enquiries) {
      company.enquiries = [...company.enquiries, enquiry._id];
    } else {
      company.enquiries = [enquiry._id];
    }

    await company.save();

    if (!user.enquiries) {
      user.enquiries = [enquiry._id];
    } else {
      user.enquiries = [...user.enquiries, enquiry._id];
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully",
      enquiry,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Some Error Occured.",
        error: error.message,
      });
  }
};

module.exports = {
  getEnquiries,
  getSingleEnquiry,
  sendResponse,
  sendEnquiry,
};
