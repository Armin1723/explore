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
    response:{
        type: String,
    }
},{
    timestamps: true,
})

const Enquiry = mongoose.model("Enquiry", enquirySchema);    

module.exports = Enquiry;