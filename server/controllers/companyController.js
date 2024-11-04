const Company = require("../models/companyModel");
const fs = require("fs");
const User = require("../models/userModel");
const cloudinary = require("../helpers/cloudinaryConfig");

const Review = require("../models/reviewModel");
const { sendMail } = require("../helpers");

//Add a company
const registerCompany = async (req, res) => {
  try {
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
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    const { id: admin } = req.user;

    const alreadyHasCompany = await User.findOne({
      _id: admin,
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
        message: "Company already exists",
        errors: {
          name: "Company already exists.",
        },
      });
    }

    const companyData = {
      name,
      email,
      subCategory,
      admin,
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
    await User.findByIdAndUpdate(admin, { company: company._id });
    const updatedUser = await User.findById(admin, {
      password: 0,
    }).populate("company");
    res.status(201).json({ success: true, user: updatedUser, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Edit a company
const editCompany = async (req, res, io) => {
  try {
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

    if (company.admin.toString() !== userId.toString()) {
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
      const message = `Your company ${updatedCompany.name} has been updated successfully. Please wait while we verify your changes. You'll be notified once your company is approved.`;
      sendMail(updatedCompany.email, message, "Company Update");

      await updatedCompany.save();
      io.emit("newRequest", updatedCompany);
    }

    await updatedCompany.save();

    const user = await User.findById(userId, { password: 0 }).populate(
      "company"
    );

    res.status(200).json({ success: true, company: updatedCompany, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch a single company detail by name
const getCompanyDetails = async (req, res) => {
  try {
    let { name } = req.params;
    name = name.split("-").join(" ");

    let company = await Company.findOne({
      name: { $regex: new RegExp(name, "i") },
    })
      .populate({
        path: "reviews",
        select: "rating comment user createdAt flags",
        populate: {
          path: "user",
          select: "name profilePic",
        },
        limit: 5,
      })
      .populate("admin", "name email phone profiePic");

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    if (company.status == "suspended") {
      return res
        .status(403)
        .json({ success: false, message: "This company has been suspended" });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch companies (with option of category search) with pagination
const getCompanies = async (req, res) => {
  try {
    let { page, category, subCategory, sort } = req.query;

    if (!page) page = 1;

    let query = { status: "active" };

    if (category && category.toLowerCase() !== "all" ) {
      query.category = category.toLowerCase();
    }

    if (subCategory && subCategory.toLowerCase() !== "all" ) {
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
      .select("name rating address phone createdAt website reviews gallery")
      .populate("reviews", "rating")
      .skip((page - 1) * 10)
      .limit(10);

    // Only include the first item from the gallery
    companies.forEach((company) => {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Fetch companies by subcategory with pagination
const getCompaniesBySubCategory = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Search companies by substring in name or description
const searchCompanies = async (req, res) => {
  try {
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

    // if (!query) {
    //   return res.status(400).json({ message: "Search query is required" });
    // }

    const companies = await Company.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
        { status: "active" },
        ...(category && category !== "all" ? [{ category: category.toLowerCase() }] : []),...(category && category !== "all" ? [{ category: category.toLowerCase() }] : []),
      ],
    })
      .sort(sortQuery)
      .limit(10)
      .skip((page - 1) * 10);

    const totalCompanies = await Company.countDocuments({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
        { status: "active" },
        ...(category && category !== "all" ? [{ category: category.toLowerCase() }] : []),
      ],
    });

    res.status(200).json({
      success: true,
      companies,
      totalCompanies,
      query,
      pages: Math.ceil(totalCompanies / 10),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Add a review to a company
const addReview = async (req, res) => {
  try {
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
    const company = await Company.findOne({ name: companyName }).populate({
      path: "reviews",
      select: "user",
    });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    let alreadyReviewed = false;
    company.reviews.map((rev) => {
      if (rev.user.toString() === user.id) alreadyReviewed = true;
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this company",
      });
    }

    const newReview = await Review.create({
      user: user.id,
      rating: review.rating,
      comment: review.comment,
      company: company._id,
    });

    company.reviews.push(newReview._id);

    // Calculate new rating
    if (company.reviews.length > 0) {
      company.rating =
        (company.rating * (company.reviews.length - 1) + review.rating) /
        company.reviews.length;
    } else {
      company.rating = review.rating;
    }

    await company.save();
    res
      .status(201)
      .json({ success: true, message: "Review added successfully", company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Fetch reviews of a company with pagination
const getReviews = async (req, res) => {
  try {
    const { companyName } = req.body;
    let { page } = req.query;

    if (!page) page = 1;

    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Company is required" });
    }
    const company = await Company.findOne(
      { name: companyName },
      { reviews: 1 }
    ).populate({
      path: "reviews",
      select: "rating comment user flags createdAt",
      populate: {
        path: "user",
        select: "name profilePic",
      },
      limit: 20,
      skip: (page - 1) * 20,
      sortBy: { createdAt: -1 },
    });

    const totalReviews = await Company.findOne({
      name: companyName,
    }).countDocuments("reviews");

    res.status(200).json({
      success: true,
      reviews: company.reviews,
      page,
      totalPages: Math.ceil(totalReviews / 20),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Flag review
const flagReview = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerCompany,
  editCompany,
  getCompanyDetails,
  getCompanies,
  getCompaniesBySubCategory,
  searchCompanies,
  addReview,
  getReviews,
  flagReview,
};
