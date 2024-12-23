const mongoose = require("mongoose");
const slugify = require("slugify");
const { encode, decode } = require("entities");

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  advertisement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advertisement",
  },
},{
  timestamps: true,
});

// Pre-save middleware for generating a slug
companySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

// Function to check if a string is already encoded
const isEncoded = (str) => str !== decode(str); 

// Pre-save hook to encode the description
companySchema.pre("save", function (next) {
  if (this.description && !isEncoded(this.description)) {
    this.description = encode(this.description);
  }
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
