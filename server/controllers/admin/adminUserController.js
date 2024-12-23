const User = require("../../models/userModel");
const { decodeDescription } = require("../../utils");

//Get all users with pagination
const getUsers = async (req, res) => {
  let { page, limit = 10 } = req.query;

  if (!page) page = 1;

  let query = { role: "user", isActive: true };

  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalUsers = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    users,
    page,
    totalPages: Math.ceil(totalUsers / 10),
  });
};

//Suspend a user
const toggleSuspendUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId).populate("company");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isActive = !user.isActive;
  await user.save();
  message = user.isActive ? "User activated" : "User deactivated";
  user.company = decodeDescription(user.company);
  res.status(200).json({ message, user });
};

//Get all suspended users with pagination
const getSuspendedUsers = async (req, res) => {
  let { page } = req.query;

  if (!page) page = 1;

  const users = await User.find({ isActive: false })
    .sort({ createdAt: -1 })
    .skip((page - 1) * 10)
    .limit(10);
  res.status(200).json({ users });
};

module.exports = { getUsers, toggleSuspendUser, getSuspendedUsers };
