const { sendMail } = require("../../helpers");
const Enquiry = require("../../models/enquiryModel");
const { enquiryAdminResponseMailTemplate, enquiryForwardMailTemplate } = require("../../templates/email");

//Fetch Enquiries with pagination
const getEnquiries = async (req, res) => {
  const { page = 1, status, limit = 10 } = req.query;

  let query = { isForwarded: false, status: { $ne: "resolved" } };
  if (status) {
    query.status = status;
  }

  const enquiries = await Enquiry.find(query)
    .populate("company")
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const totalEnquiries = await Enquiry.countDocuments(query);
  res.status(200).json({
    success: true,
    enquiries,
    page,
    totalEnquiries,
    totalPages: Math.ceil(totalEnquiries / limit),
  });
};

const getSingleEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id)
    .populate("company")
    .populate("user");
  if (!enquiry) {
    return res
      .status(404)
      .json({ success: false, message: "Enquiry not found" });
  }
  res.status(200).json({ success: true, enquiry });
};

const sendResponse = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id).populate("user", "email name").populate("company", "name");
  if (!enquiry) {
    return res
      .status(404)
      .json({ success: false, message: "Enquiry not found" });
  }
  enquiry.status = "resolved";
  enquiry.response = req.body.response;

  sendMail(
    (to = enquiry.user.email),
    (subject = `Re: ${enquiry.message}`),
    (message = enquiryAdminResponseMailTemplate(enquiry.user, enquiry.response, enquiry.company.name ))
  );
  await enquiry.save();
  res.status(200).json({ success: true, enquiry });
};

const forwardResponseToCompany = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    return res
      .status(404)
      .json({ success: false, message: "Enquiry not found" });
  }
  enquiry.isForwarded = true;
  await enquiry.save();
  const enquiryCompany = await Enquiry.findOne({ _id: req.params.id }).populate(
    "company",
    "email name slug"
  );
  sendMail(
    (to = enquiryCompany.company.email),
    (subject = `New Enquiry`),
    (message = enquiryForwardMailTemplate(enquiryCompany.company, enquiry.message))
  );
  return res
    .status(200)
    .json({ success: true, companyName: enquiryCompany.company.name });
};
module.exports = {
  getEnquiries,
  getSingleEnquiry,
  sendResponse,
  forwardResponseToCompany,
};
