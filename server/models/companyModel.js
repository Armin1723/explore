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
    subCategory: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "Please provide at least one sub-category",
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

export const Company = mongoose.model("Company", companySchema);

module.exports = Company;