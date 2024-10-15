const mongoose = require("mongoose"); 

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    status:{
        type: String,
        enum: ["active", "hidden", "blocked"],
        default: "active",
    },
    subCategory: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length > 0 && v.length <= 3;
            },
            message: "There should be at least 1 and at most 3 sub-categories",
        },
    },
    phone: {
        number: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
    },
    website: {
        type: String,
        required: [true, "Please provide a website"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    logo: {
        public_id: {
            type: String,
            default: null,
        },
        url: {
            type: String,
            default: null,
        },
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    enquiries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enquiry",
        },
    ],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;