const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { getEnquiries, getSingleEnquiry, sendResponse, sendEnquiry, markAsRead, deleteEnquiry } = require("../controllers/enquiryController");
const router = express.Router();


//Enquiry routes with pagination
router.get("/:companyId", isLoggedIn, getEnquiries);
router.get("/enquiry/:id", isLoggedIn, getSingleEnquiry);
router.post("/reply", isLoggedIn, sendResponse);

router.post("/mark-read", isLoggedIn, markAsRead);
router.post("/delete", isLoggedIn, deleteEnquiry);

//Send Enquiries
router.post('/send',isLoggedIn, sendEnquiry);

module.exports = router;