require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helpers");
const cloudinary = require("../helpers/cloudinaryConfig");
const crypto = require("crypto");
const fs = require("fs");
const Company = require("../models/companyModel");
const Enquiry = require("../models/enquiryModel");

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, write again.",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    if (user.isVerified === false) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your email" });
    }
    if (user.role == "admin" && user.role !== role) {
      return res
        .status(400)
        .json({ success: false, message: "You don't have admin priveleges." });
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
    });
    user.password = undefined;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, write again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const mobileUsed = await User.findOne({ phone });
    if (mobileUsed) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile number already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      name,
      email,
      phone,
      password: hashedPassword,
    };

    if (role) userData.role = role;

    // Handling ProfilePic Upload to cloudinary
    if (req.files && req.files?.profilePic) {
      const { profilePic } = req.files;
      if (profilePic) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            profilePic[0].path,
            { folder: "User_Profile" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res
              .status(500)
              .json({
                success: false,
                message: "Failed to upload profilePic to cloud.",
                error: cloudinaryResponse.error,
              });
          }
          userData.profilePic = cloudinaryResponse.secure_url;
          fs.unlink(profilePic[0].path, (err) => {
            if (err) {
              console.error("Failed to delete temporary profilePic file:", err);
            }
          });
        } catch (error) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Failed to upload profilePic",
              error: error.message,
            });
        }
      }
    }
    const user = await User.create(userData);
    const message = `<p>Hi ${user.name} . Kindly use this link to verify your email. <a href="${process.env.BACKEND_URL}/api/user/verify?id=${user._id}">here</a>`;

    sendMail(user.email, message, (subject = "Email Verification"));
    res
      .status(201)
      .json({ success: true, message: "kindly check your e-mail!" });
  } catch (error) {
    console.error(error);
  }
};

const verifyUser = async (req, res) => {
  try {
    try {
      const updateInfo = await User.updateOne(
        { _id: req.query.id },
        { isVerified: true }
      );

      if (updateInfo.nModified === 0) {
        return res.status(400).json({ error: "User not found" });
      }
      res
        .status(200)
        .send(
          "<div>Email Verified Successfully. Kindly Login to continue</div>"
        );
    } catch (error) {
      res.status(500).json({ error: "Error Occured" });
    }
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
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
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const forgotPasswordToken = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = forgotPasswordToken;
    user.forgotPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    const message = `<p>Hi ${user.name} . Kindly use this link to reset your password. <a href="${process.env.FRONTEND_URL}/reset-password?token=${forgotPasswordToken}">here</a>`;
    sendMail(user.email, message, (subject = "Password Reset Link"));
    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { forgotPasswordToken, userID, newPassword } = req.body;
    const user = await User.findOne(
      {
        _id: userID,
        forgotPasswordToken,
        forgotPasswordExpires: { $gt: Date.now() },
      },
      {
        forgotPasswordToken: 1,
        forgotPasswordExpires: 1,
        password: 1,
      }
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found or invalid token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpires = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const toggleSavedCompany = async (req, res) => {
  try {
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
    res
      .status(200)
      .json({ success: true, message: "Company saved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  logoutUser,
  editUser,
  fetchUserById,
  forgotPassword,
  resetPassword,
  toggleSavedCompany,
};
