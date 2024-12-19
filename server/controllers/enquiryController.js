const { sendMail } = require("../helpers");
const Company = require("../models/companyModel");
const Enquiry = require("../models/enquiryModel");
const User = require("../models/userModel");

//Fetch Enquiries of a company with pagination
const getEnquiries = async (req, res) => {
    const { companyId } = req.params;
    let { page } = req.query;

    if (!page) page = 1;

    const company = await Company.findOne(
      { _id: companyId },
      { enquiries: 1 }
    ).populate({
      path: "enquiries",
      match: { status: "pending" },
      populate: {
        path: "user",
        select: "name profilePic",
      },
      options:{
        limit: 10,
        skip: (page - 1) * 10,
        sort: { createdAt: -1 },
      }
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const totalEnquiries = await Company.findOne({
      _id: companyId,
    }).populate({
      path: "enquiries",
      match: { status: "pending" },
    });

    res.status(200).json({
      success: true,
      enquiries: company.enquiries,
      page,
      totalEnquiries: totalEnquiries.enquiries.length,
      totalPages: Math.ceil(totalEnquiries / 10),
    });
 };

//Fetch a single enquiry
const getSingleEnquiry = async (req, res) => {
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
};

//Send response to an enquiry
const sendResponse = async (req, res) => {
    const { enquiryId, response } = req.body;

    const enquiry = await Enquiry.findById(enquiryId).populate('user', 'name email');
    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    enquiry.response = response;
    enquiry.status = "responded";
    await enquiry.save();


    sendMail(
      enquiry.user.email,
      "Response to your enquiry",
      `Hello <strong>${enquiry.user.name}</strong>,<br/>We have received your enquiry and here is the response:<br/><strong>${response}</strong><br/>Thank you for contacting us.<br/>Regards,`,
    );

    res
      .status(200)
      .json({ success: true, message: "Response sent successfully", enquiry });
};

//Send an enquiry
const sendEnquiry = async (req, res) => {
    const { slug, message } = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    const company = await Company.findOne({ slug });
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
};

//Mark an enquiry as read
const markAsRead = async (req, res) => {
    const { enquiryId } = req.body;
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }
    enquiry.status = "responded";
    await enquiry.save();
    res
      .status(200)
      .json({ success: true, message: "Enquiry marked as read" });
};

//Delete an enquiry
const deleteEnquiry = async (req, res) => {
    const { enquiryId } = req.body;
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    const company = await Company.findById(enquiry.company);
    company.enquiries = company.enquiries.filter(
      (enq) => enq.toString() !== enquiryId
    );
    await company.save();

    const user = await User.findById(enquiry.user);
    user.enquiries = user.enquiries.filter(
      (enq) => enq.toString() !== enquiryId
    );
    await user.save();

    await enquiry.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Enquiry deleted successfully" });
};

module.exports = {
  getEnquiries,
  getSingleEnquiry,
  sendResponse,
  sendEnquiry,
  markAsRead,
  deleteEnquiry,
};
