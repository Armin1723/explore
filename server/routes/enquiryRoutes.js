const express = require("express");
const { isAdmin, isLoggedIn } = require("../middlewares");
const { getEnquiries, getSingleEnquiry, sendResponse, sendEnquiry } = require("../controllers/enquiryController");
const router = express.Router();


//Enquiry routes with pagination
router.get("/:companyId", isAdmin, getEnquiries);
router.get("/enquiry/:id", isAdmin, getSingleEnquiry);
router.post("/send-response", isAdmin, sendResponse);

//Send Enquiries
router.post('/send',isLoggedIn, sendEnquiry);

module.exports = router;