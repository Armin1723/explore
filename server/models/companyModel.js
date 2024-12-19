const mongoose = require("mongoose");
const slugify = require("slugify");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a company name"],
    unique: [true, "Company name already exists"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a company email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: {
      validator: (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 
      message: "Please provide a valid email address",
    },
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ["active", "pending", "suspended", "incomplete"],
    default: "incomplete",
  },
  subCategory: {
    type: [String],
    validate: {
      validator: (v) => v.length > 0 && v.length <= 3,
      message: "There should be at least 1 and at most 3 sub-categories",
    },
  },
  phone: {
    number: {
      type: String,
      required: [true, "Please provide a phone number"],
      validate: {
        validator: (number) => /^[0-9]{10,15}$/.test(number), 
        message: "Please provide a valid phone number",
      },
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  logo: {
    public_id: { type: String, default: null },
    url: { type: String, default: null },
  },
  banner: {
    public_id: { type: String, default: null },
    url: { type: String, default: null },
  },
  gallery: [
    {
      public_id: { type: String },
      url: { type: String },
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  enquiries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enquiry",
    },
  ],
  advertisement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advertisement",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware for generating a slug
companySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
