const { sendMail } = require("../helpers");
const Company = require("../models/companyModel");
const Enquiry = require("../models/enquiryModel");
const User = require("../models/userModel");
const { enquiryResponseMailTemplate } = require("../templates/email");

//Fetch Enquiries of a company with pagination
const getEnquiries = async (req, res) => {
  const { companyId } = req.params;
  let { page = 1, status = "pending" } = req.query;

  const company = await Company.findOne({ _id: companyId }).populate("name");
  if (!company) {
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });
  }

  const query = { company: companyId, isForwarded: true, status };

  if (status) {
    query.status = status;
  }

  const enquiries = await Enquiry.find(
    query).populate("user", "name profiePic").sort({ createdAt: -1 }).limit(10).skip((page - 1) * 10);
    

  const totalEnquiries = await Enquiry.countDocuments({
    company: companyId,
    status: "pending",
    isForwarded: true,
  });

  res.status(200).json({
    success: true,
    enquiries,
    page,
    totalEnquiries,
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

  const enquiry = await Enquiry.findById(enquiryId).populate(
    "user",
    "name email"
  ).populate("company", "name");
  if (!enquiry) {
    return res
      .status(404)
      .json({ success: false, message: "Enquiry not found" });
  }

  enquiry.response = response;
  enquiry.status = "resolved";
  await enquiry.save();

  sendMail(
    enquiry.user.email,
    "Response to your enquiry",
    message = enquiryResponseMailTemplate(enquiry.user, response, enquiry.company.name)
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
  enquiry.status = "read";
  await enquiry.save();
  res.status(200).json({ success: true, message: "Enquiry marked as read" });
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
