const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isLoggedIn = (req, res, next) => {
 try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded || decoded.exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({ success: false, message: "Token Expired. Please Login Again" });
    }
    req.user = decoded;
    next();
 } catch (error) {
   res.status(500).json({ success: false, message: error.message });
 }
};

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = await User.findById(decoded.id).select("role");
    if (userRole.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "You are not authorized for this action." });
    }
    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { isLoggedIn, isAdmin };