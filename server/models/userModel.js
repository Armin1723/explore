const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    profilePic: {
        type: String,
        default: "https://github.com/shadcn.png"
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false
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
    isActive:{
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
})

const User = mongoose.model("User", userSchema);

module.exports = User;