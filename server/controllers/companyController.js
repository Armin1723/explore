const Company = require("../models/companyModel");
const fs = require("fs");
const User = require("../models/userModel");
const cloudinary = require("../helpers/cloudinaryConfig");

const Review = require("../models/reviewModel");
const { sendMail } = require("../helpers");
const Enquiry = require("../models/enquiryModel");
const { decodeDescription } = require("../utils");
const { listingCompleteMailTemplate } = require("../templates/email");

//Add a company
const registerCompany = async (req, res) => {
  const { name, email, subCategory, category, website, address, number } =
    req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!category) missingFields.push("category");
  if (!subCategory.length) missingFields.push("subCategory");
  if (!address) missingFields.push("address");
  if (!number) missingFields.push("number");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `The following fields are required: ${missingFields.join(", ")}`,
    });
  }

  const { id: user } = req.user;

  const alreadyHasCompany = await User.findOne({
    _id: user,
    company: { $exists: true },
  });
  if (alreadyHasCompany) {
    return res.status(400).json({
      success: false,
      message: "You already have a company registered",
    });
  }

  const existingCompany = await Company.findOne({ name });
  if (existingCompany) {
    return res.status(400).json({
      success: false,
      message: "Company with this name already exists",
      errors: {
        name: "Company with this name already exists.",
      },
    });
  }

  const companyData = {
    name,
    email,
    subCategory,
    user,
    category,
    address,
    website,
    phone: {
      number,
      isVisible: false,
    },
  };

  if (website) companyData.website = website;

  // Handling Logo Upload to cloudinary
  if (req.files && req.files.logo) {
    const { logo } = req.files;
    if (logo) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          logo[0].path,
          { folder: "Company_Logo" }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload logo to cloud.",
          });
        }
        companyData.logo = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
        fs.unlink(logo[0].path, (err) => {
          if (err) {
            console.error("Failed to delete temporary logo file:", err);
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload logo",
          error: error.message,
        });
      }
    }
  }

  const company = await Company.create(companyData);
  await User.findByIdAndUpdate(user, { company: company._id });
  const updatedUser = await User.findById(user, {
    password: 0,
  }).populate("company");
  res.status(201).json({ success: true, user: updatedUser, company });
};

//Edit a company
const editCompany = async (req, res, next, io) => {
  const { companyId } = req.params;

  const { edit } = req.query;

  const { id: userId } = req.user;

  const companyData = req.body;
  if (!companyId) {
    return res.status(400).json({
      success: false,
      message: "Company Id is required",
    });
  }
  const company = await Company.findOne({ _id: companyId });
  if (!company) {
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });
  }

  if (company.user.toString() !== userId.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to edit this company",
    });
  }

  // Handling files Upload to cloudinary
  if (
    req.files &&
    (req.files?.logo || req.files?.banner || req.files?.gallery)
  ) {
    const { logo, banner, gallery } = req.files;
    if (logo) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          logo[0].path,
          { folder: "Company_Logo" }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload logo to cloud.",
          });
        }
        companyData.logo = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
        fs.unlink(logo[0].path, (err) => {
          if (err) {
            console.error("Failed to delete temporary logo file:", err);
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload logo",
          error: error.message,
        });
      }
    }

    if (banner) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          banner[0].path,
          {
            // quality: "auto:best",
            // format: "auto",
            folder: "Company_Banner",
          }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload banner to cloud.",
          });
        }
        companyData.banner = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
        fs.unlink(banner[0].path, (err) => {
          if (err) {
            console.error("Failed to delete temporary logo file:", err);
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload logo",
          error: error.message,
        });
      }
    }

    if (gallery) {
      for (let i = 0; i < gallery.length; i++) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            gallery[i].path,
            {
              // quality: "auto:best",
              // format: "auto",
              folder: "Company_Gallery",
            }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({
              success: false,
              message: cloudinaryResponse.error.message,
            });
          }
          if (!companyData.gallery) {
            companyData.gallery = [];
          }
          companyData.gallery.push({
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          });
          fs.unlink(gallery[i].path, (err) => {
            if (err) {
              console.error("Failed to delete temporary gallery file:", err);
            }
          });

          const updatedCompany = await Company.findOneAndUpdate(
            { _id: companyId },
            companyData,
            {
              new: true,
            }
          );
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload image",
            error: error.message,
          });
        }
      }
    }
  }

  const updatedCompany = await Company.findOneAndUpdate(
    { _id: companyId },
    companyData,
    {
      new: true,
    }
  );

  if (edit && edit === "true") {
    updatedCompany.status = "pending";

    //send mail
    const message = listingCompleteMailTemplate(updatedCompany.name);
    sendMail(updatedCompany.email, "Company Update", message);

    await updatedCompany.save();
    io.emit("newRequest", updatedCompany);
  }

  await updatedCompany.save();

  const user = await User.findById(userId, { password: 0 }).populate("company");

  res.status(200).json({ success: true, company: updatedCompany, user });
};

//Fetch a single company detail by name
const getCompanyDetails = async (req, res) => {
  let { slug } = req.params;
  const isAdmin = req.query.isAdmin === "true";

  let company = await Company.findOne({
    slug,
  }).populate("user", "_id name email phone profiePic");

  if (!company) {
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });
  }

  if (!isAdmin && company.status == "suspended") {
    return res
      .status(403)
      .json({ success: false, message: "This company has been suspended" });
  }

  company = decodeDescription(company);
  company = company.toObject();

  const companyReviews = await Review.find({ company: company._id })
    .populate("user", "name profilePic")
    .limit(5)
    .sort({ createdAt: -1 });

  if (companyReviews.length > 0) {
    company.reviews = companyReviews;
  }

  const enquiries = await Enquiry.find(
    { company: company._id, isForwarded: true, status: "pending" },
    {
      status: 1,
    }
  );

  if (enquiries.length > 0) {
    company.enquiries = enquiries;
  }

  res.status(200).json({ success: true, company });
};

//Fetch companies (with option of category search) with pagination
const getCompanies = async (req, res) => {
  let { page, category, subCategory, sort } = req.query;

  if (!page) page = 1;

  let query = { status: "active" };

  if (category && category.toLowerCase() !== "all") {
    query.category = category.toLowerCase();
  }

  if (subCategory && subCategory.toLowerCase() !== "all") {
    query.subCategory = { $in: [subCategory.toLowerCase()] };
  }

  let sortQuery = { rating: -1 };
  if (sort) {
    if (sort === "Rating") {
      sortQuery = { rating: -1 };
    }
    if (sort === "createdAt") {
      sortQuery = { createdAt: -1 };
    }
    if (sort === "Name") {
      sortQuery = { name: -1 };
    }
  }

  const companies = await Company.find(query)
    .sort(sortQuery)
    .select("name rating address phone createdAt website reviews gallery slug")
    .skip((page - 1) * 10)
    .limit(10);

  // Only include the first item from the gallery
  companies.forEach((company) => {
    company = decodeDescription(company);
    if (company.gallery && company.gallery.length > 0) {
      company.gallery = company.gallery[0];
    }
  });

  const totalCompanies = await Company.countDocuments(query);

  res.status(200).json({
    success: true,
    companies,
    page,
    totalPages: Math.ceil(totalCompanies / 10),
  });
};

//Fetch companies by subcategory with pagination
const getCompaniesBySubCategory = async (req, res) => {
  let { subCategory } = req.params;
  let { page } = req.query;

  if (!page) page = 1;

  if (subCategory === "all") {
    subCategory = { subCategory: { $exists: true } };
  } else {
    subCategory = { subCategory: { $in: [subCategory] } };
  }

  const companies = await Company.find({ ...subCategory, status: "active" })
    .limit(10)
    .skip((page - 1) * 10);

  companies.forEach((company) => {
    company = decodeDescription(company);
  });

  const totalCompanies = await Company.countDocuments({
    ...subCategory,
    status: "active",
  });
  res.status(200).json({
    success: true,
    companies,
    totalCompanies,
    subCategory: req.params.subCategory,
    pages: Math.ceil(totalCompanies / 10),
  });
};

//Search companies by substring in name or description
const searchCompanies = async (req, res) => {
  let { page, category, sort, query } = req.query;

  if (!page) page = 1;

  let queryData = { status: "active" };

  if (category && category !== "all") {
    queryData.category = category.toLowerCase();
  }

  let sortQuery = { rating: -1 };
  if (sort) {
    if (sort === "Rating") {
      sortQuery = { rating: -1 };
    }
    if (sort === "createdAt") {
      sortQuery = { createdAt: -1 };
    }
    if (sort === "Name") {
      sortQuery = { name: -1 };
    }
  }

  const companies = await Company.find({
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      },
      { status: "active" },
      ...(category && category !== "all"
        ? [{ category: category.toLowerCase() }]
        : []),
    ],
  })
    .sort(sortQuery)
    .limit(10)
    .skip((page - 1) * 10);

  companies.forEach((company) => {
    company = decodeDescription(company);
  });

  const totalCompanies = await Company.countDocuments({
    $and: [
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      },
      { status: "active" },
      ...(category && category !== "all"
        ? [{ category: category.toLowerCase() }]
        : []),
    ],
  });

  res.status(200).json({
    success: true,
    companies,
    totalCompanies,
    query,
    pages: Math.ceil(totalCompanies / 10),
  });
};

//Trending Companies
const getTrendingCompanies = async (req, res) => {
  const companies = await Company.find({ status: "active" })
    .select("name description gallery rating logo category slug")
    .sort({ rating: -1 })
    .limit(10);

  companies.forEach((company) => {
    company = decodeDescription(company);
  });

  res.status(200).json({ success: true, companies });
};

//Similar Companies
const getSimilarCompanies = async (req, res) => {
  const { category } = req.query;
  if (!category) category = "all";

  const companies = await Company.find({ status: "active", category: category })
    .select("name description gallery rating slug")
    .sort({ rating: -1 })
    .limit(10);

  if (companies.length < 5) {
    const remainingCompanies = await Company.find({
      status: "active",
      category: { $ne: category },
    })
      .select("name description gallery rating slug")
      .sort({ rating: -1 })
      .limit(4 - companies.length);
    companies.push(...remainingCompanies);
  }

  companies.forEach((company) => {
    company = decodeDescription(company);
  });

  res.status(200).json({ success: true, companies });
};

//Get a placeholder company in place of advertised company
const getPlaceholderCompany = async (req, res) => {
  const { slug = "" } = req.params;
  let company = await Company.aggregate([
    { $match: { slug: { $ne: slug } } }, 
    { $sample: { size: 1 } } 
  ]);
  if (!company) {
    return res
      .status(404)
      .json({ success: false, message: "Placeholder company not found" });
  }
  company = decodeDescription(company[0]);
  res.status(200).json({ success: true, company });
};

//Add a review to a company
const addReview = async (req, res) => {
  const { companyName, review } = req.body;
  const { user } = req;
  if (!companyName) {
    return res
      .status(400)
      .json({ success: false, message: "Company is required" });
  }
  if (!review) {
    return res
      .status(400)
      .json({ success: false, message: "Review is required" });
  }

  let company = await Company.findOne({
    name: { $regex: new RegExp(companyName, "i") },
  });

  if (!company) {
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });
  }

  const existingReview = await Review.findOne({
    user: user.id,
    company: company._id,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this company",
    });
  }

  await Review.create({
    user: user.id,
    rating: review.rating,
    comment: review.comment,
    company: company._id,
  });

  const companyReviews = await Review.find({ company: company._id })
    .populate({
      path: "user",
      select: "name profilePic",
    })
    .limit(5)
    .sort({ createdAt: -1 });

  // Calculate new rating
  if (companyReviews.length > 0) {
    company.rating =
      (company.rating * (companyReviews.length - 1) + review.rating) /
      companyReviews.length;
  } else {
    company.rating = review.rating;
  }

  await company.save();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    reviews: companyReviews,
    rating: company.rating,
  });
};

//Fetch reviews of a company with pagination
const getReviews = async (req, res) => {
  const { companyName } = req.body;
  let { skip = 0 } = req.query;

  if (!companyName) {
    return res
      .status(400)
      .json({ success: false, message: "Company is required" });
  }
  const company = await Company.findOne(
    { name: companyName },
    { name: 1, _id: 1 }
  );

  const companyReviews = await Review.find({ company: company._id })
    .populate({
      name: "user",
      select: "name profilePic",
    })
    .limit(5)
    .skip(skip)
    .sort({ createdAt: -1 });

  const totalReviews = await Review.countDocuments({ company: company._id });

  res.status(200).json({
    success: true,
    reviews: companyReviews,
    page: skip / 5 + 1,
    totalPages: Math.ceil(totalReviews / 5),
    hasMore: totalReviews > skip + 5,
  });
};

//Fetch a single review by id
const getReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id).populate("user", "name profilePic");
  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }
  res.status(200).json({ success: true, review });
};

//Flag review
const flagReview = async (req, res) => {
  const { reviewId } = req.params;
  const { user } = req;

  const review = await Review.findById(reviewId);
  if (!review) {
    return res
      .status(404)
      .json({ success: false, message: "Review not found" });
  }

  let alreadyFlagged = false;
  review.flags.some((flag) => {
    if (flag.toString() === user.id) {
      alreadyFlagged = true;
    }
  });

  if (alreadyFlagged) {
    return res.status(400).json({
      success: false,
      message: "You have already flagged this review",
    });
  }

  review.flags.push(user.id);
  await review.save();

  res.status(200).json({ success: true, message: "Review flagged" });
};

module.exports = {
  registerCompany,
  editCompany,
  getCompanyDetails,
  getCompanies,
  getCompaniesBySubCategory,
  searchCompanies,
  getTrendingCompanies,
  getSimilarCompanies,
  getPlaceholderCompany,
  addReview,
  getReviews,
  getReview,
  flagReview,
};
