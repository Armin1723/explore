const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Login as admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
      errors: {
        email: "Please provide email",
        password: "Please provide password",
      },
    });
  }
  const user = await User.findOne({ email })
    .select("+password")
    .populate("company");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
      errors: {
        email: "User not found",
      },
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password",
      errors: {
        password: "Invalid Password",
      },
    });
  }
  if (user.isVerified === false) {
    return res
      .status(400)
      .json({ success: false, message: "Please verify your email" });
  }
  if (user.role !== "admin") {
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
    secure: true,
    sameSite: "None",
  });
  user.password = undefined;
  res.status(200).json({ success: true, user });
};

//Logout as admin
const logoutAdmin = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { loginAdmin, logoutAdmin };
