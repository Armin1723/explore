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
    isForwarded : {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["pending", "resolved", "read"],
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