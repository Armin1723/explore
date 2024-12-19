const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: {
      validator: (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 
      message: "Please provide a valid email address",
    },
  },
  profilePic: {
    type: String,
    default: "https://github.com/shadcn.png",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false, 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  savedCompanies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  enquiries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enquiry",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a mobile number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fcmToken: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    select: false, 
  },
  otpExpires: {
    type: Date,
    select: false,
  },
  forgotPasswordToken: {
    type: String,
    select: false,
  },
  forgotPasswordExpires: {
    type: Date,
    select: false,
  },
});

// Ensure email uniqueness is case-insensitive
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
