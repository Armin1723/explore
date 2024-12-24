require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helpers");
const cloudinary = require("../helpers/cloudinaryConfig");
const crypto = require("crypto");
const fs = require("fs");
const Review = require("../models/reviewModel");
const { decodeDescription } = require("../utils");
const {
  otpMailTemplate,
  welcomeMailTemplate,
  forgotPasswordMailTemplate,
} = require("../templates/email");
const Enquiry = require("../models/enquiryModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errors: {
        email: "Email is required",
        password: "Password is required",
      },
    });
  }

  let user = await User.findOne({ email })
    .select("+password")
    .populate("company");

  if (!user || user.length === 0) {
    return res
      .status(400)
      .json({ success: false, errors: { email: "User not found" } });
  }

  if (user.company) {
    user.company = decodeDescription(user.company);
  }

  if (!user.isActive) {
    return res.status(400).json({
      success: false,
      errors: { email: "Your account has been suspended." },
    });
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, errors: { password: "Invalid password" } });
  }
  if (user.isVerified === false) {
    return res.status(400).json({
      success: false,
      message: "Please verify your email",
      errors: {
        email: "Please verify your email",
      },
    });
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
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  user.password = undefined;
  res.status(200).json({ success: true, user });
};

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: "All fields are required, write again.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
      errors: { email: "Email already exists" },
    });
  }
  const mobileUsed = await User.findOne({ phone });
  if (mobileUsed) {
    return res.status(400).json({
      success: false,
      message: "Mobile number already in use",
      errors: { phone: "Mobile number already in use" },
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    phone,
    password: hashedPassword,
  };

  // Handling ProfilePic Upload to cloudinary
  if (req.files && req.files.profilePic) {
    const { profilePic } = req.files;
    if (profilePic) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          profilePic[0].path,
          { folder: "User_Profile" }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload profilePic to cloud.",
            error: cloudinaryResponse.error,
          });
        }
        userData.profilePic = cloudinaryResponse.secure_url;
        // fs.unlink(profilePic[0].path, (err) => {
        //   if (err) {
        //     console.error("Failed to delete temporary profilePic file:", err);
        //   }
        // });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
          error: error.message,
        });
      }
    }
  }
  const user = await User.create(userData);

  user.otp = Math.floor(1000 + Math.random() * 9000);
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  const message = otpMailTemplate(user);

  sendMail(user.email, (subject = "Email Verification"), message);

  res.status(201).json({ success: true, message: "kindly check your e-mail!" });
};

const verifyUser = async (req, res) => {
  const updateInfo = await User.updateOne(
    { _id: req.query.id },
    { isVerified: true }
  );

  if (updateInfo.nModified === 0) {
    return res.status(400).json({ error: "User not found" });
  }
  res
    .status(200)
    .send("<div>Email Verified Successfully. Kindly Login to continue</div>");
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email }).select("+otp +otpExpires");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
      errors: { otp: "User not found" },
    });
  }
  if (user.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
      errors: { otp: "Invalid OTP" },
    });
  }
  if (user.otpExpires < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP expired",
      expired: true,
      errors: { otp: "OTP expired" },
    });
  }
  user.otp = undefined;
  user.otpExpires = undefined;
  user.isVerified = true;
  await user.save();

  //login user
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  //Send Welcome Email
  const message = welcomeMailTemplate(user);
  sendMail(user.email, (subject = "Welcome to Link India"), message);

  user.password = undefined;
  res.status(200).json({ success: true, user });
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
      errors: { otp: "User not found" },
    });
  }
  if (user.isVerified === true) {
    return res.status(400).json({
      success: false,
      message: "User already verified",
      errors: { otp: "User already verified" },
    });
  }
  if (user.otp && user.otpExpires > Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP already sent",
      errors: { otp: "OTP already sent" },
    });
  }
  user.otp = Math.floor(1000 + Math.random() * 9000);
  user.otpExpires = Date.now() + 10 * 60 * 1000; //10 minutes
  await user.save();
  const message = otpMailTemplate(user);
  sendMail(user.email, (subject = "Email Verification"), message);
  res.status(200).json({ success: true, message: "kindly check your e-mail!" });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const editUser = async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({ success: true, user });
};

const fetchUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, { password: 0 }).populate("company");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.company) {
    user.company = decodeDescription(user.company);
  }

  res.status(200).json({ success: true, user });
};

// Fetch User Enquiries.
const fetchUserEnquiries = async (req, res) => {
  const { id } = req.params;

  const { page = 1, type, limit = 5 } = req.query;

  const query = {
    user: id,
  };

  if (type === "all") {
    query.status = { $ne: "read" };
  } else {
    query.status = "resolved";
  }
  const userEnquiries = await Enquiry.find(query)
    .populate("company user")
    .limit(limit)
    .skip((page - 1) * limit);

  const totalEnquiries = await Enquiry.countDocuments(query);

  res.status(200).json({
    success: true,
    message: "User responses fetched successfully",
    enquiries: userEnquiries,
    page,
    totalPages: Math.ceil(totalEnquiries / limit),
  });
};

//Mark Enquiry response as read (delete)
const markUserResponseAsRead = async (req, res) => {
  const enquiry = await Enquiry.findById(req.body.enquiryId);
  if (!enquiry) {
    return res
      .status(404)
      .json({ success: false, message: "Enquiry not found" });
  }
  enquiry.status = "read";
  await enquiry.save();
  res
    .status(200)
    .json({ success: true, message: "Enquiry deleted successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne(
    { email },
    {
      name: 1,
      email: 1,
      forgotPasswordToken: 1,
      forgotPasswordExpires: 1,
    }
  );
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  if (user.isVerified === false) {
    return res
      .status(400)
      .json({ success: false, message: "Please verify your email" });
  }

  if (user.forgotPasswordToken && user.forgotPasswordExpires > Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Password reset link already sent" });
  }

  const forgotPasswordToken = crypto.randomBytes(32).toString("hex");
  user.forgotPasswordToken = forgotPasswordToken;
  user.forgotPasswordExpires = Date.now() + 30 * 60 * 1000;
  await user.save();

  //Send Password Reset Email
  const message = forgotPasswordMailTemplate(user);
  sendMail(user.email, (subject = "Password Reset Link"), message);
  res.status(200).json({ success: true, message: "Password reset email sent" });
};

const resetPassword = async (req, res) => {
  const { forgotPasswordToken, newPassword } = req.body;
  const user = await User.findOne(
    {
      forgotPasswordToken,
    },
    {
      forgotPasswordToken: 1,
      forgotPasswordExpires: 1,
      password: 1,
    }
  );

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  if (user.forgotPasswordExpires < Date.now()) {
    return res.status(400).json({ success: false, message: "Token expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpires = undefined;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
};

const toggleSavedCompany = async (req, res) => {
  const { companyId } = req.body;
  const { id } = req.user;
  const user = await User.findById(id);

  const savedCompanies = user.savedCompanies;
  if (savedCompanies.includes(companyId)) {
    user.savedCompanies = savedCompanies.filter(
      (company) => company.toString() !== companyId.toString()
    );
  } else {
    user.savedCompanies = [...savedCompanies, companyId];
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Company save toggled successfully",
    user,
  });
};

const fetchSavedCompanies = async (req, res) => {
  const { id } = req.params;
  let { page } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  if (!page) {
    page = 1;
  }

  const user = await User.findById(id).populate({
    path: "savedCompanies",
    model: "Company",
    populate: "name email phone address gallery slug",
    limit: 10,
    skip: (page - 1) * 10,
  });

  user.savedCompanies.forEach((company) => {
    company = decodeDescription(company);
  });

  const totalResults = await User.findById(id).populate(
    "savedCompanies",
    "_id"
  );
  const totalPages = Math.ceil(totalResults.savedCompanies.length / 10);

  const savedCompanies = user.savedCompanies;
  res.status(200).json({
    success: true,
    message: "Saved companies fetched successfully",
    stores: savedCompanies,
    page,
    totalPages,
  });
};

const fetchReviewedCompanies = async (req, res) => {
  const { id } = req.params;
  let { page = 1 } = req.query;

  const userReviews = await Review.find({ user: id })
    .populate("company")
    .limit(10)
    .skip((page - 1) * 10);

  userReviews.forEach((review) => {
    review.company = decodeDescription(review.company);
  });

  const totalReviews = await Review.find({ user: id });

  res.status(200).json({
    success: true,
    message: "User reviews fetched successfully",
    reviews: userReviews,
    page,
    totalPages: Math.ceil(totalReviews.length / 10),
  });
};

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  verifyOtp,
  resendOtp,
  logoutUser,
  editUser,
  fetchUserById,
  forgotPassword,
  fetchUserEnquiries,
  markUserResponseAsRead,
  resetPassword,
  toggleSavedCompany,
  fetchSavedCompanies,
  fetchReviewedCompanies,
};
