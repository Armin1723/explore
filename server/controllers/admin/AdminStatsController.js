const Advertisement = require("../../models/advertisementModel");
const Category = require("../../models/categoryModel");
const Company = require("../../models/companyModel");
const User = require("../../models/userModel");

//Get Admin Stats
const getAdminStats = async (req, res) => {
  const users = await User.countDocuments({ role: "user" });
  const companies = await Company.countDocuments();
  const categories = await Category.countDocuments();
  const data = [
    { id: 0, name: "users", value: users },
    { id: 1, name: "companies", value: companies },
    { id: 2, name: "categories", value: categories },
  ];
  res.status(200).json({ success: true, data });
};

//Get Banners
const getBanners = async (req, res, limit = 20) => {
  const { page = 1 } = req.query;

  // Fetch active advertisements with populated company banner
  const advertisedCompanies = await Advertisement.find({
    featured: true,
    endDate: { $gte: new Date() },
  })
    .populate({
      path: "company",
      select: "banner gallery",
    })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalBanners = await Advertisement.countDocuments({
    status: "active",
    endDate: { $gte: new Date() },
  });

  const updatedBanners = advertisedCompanies.map((advertisement) => {
    const company = advertisement.company;
    const bannerImage =
      company.banner || (company.gallery && company.gallery[0]) || null;
    return {
      ...advertisement.toObject(),
      banner: bannerImage,
    };
  });

  res.status(200).json({
    page: page,
    totalPages: Math.ceil(totalBanners / limit),
    banners: updatedBanners,
  });
};

module.exports = { getAdminStats, getBanners };
