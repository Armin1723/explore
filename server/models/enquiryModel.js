const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    status: {
        type: String,
        enum: ["pending", "responded", "rejected"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    response:{
        type: String,
    }
})

const Enquiry = mongoose.model("Enquiry", enquirySchema);    

module.exports = Enquiry;