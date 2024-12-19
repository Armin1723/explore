const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { getEnquiries, getSingleEnquiry, sendResponse, sendEnquiry, markAsRead, deleteEnquiry } = require("../controllers/enquiryController");
const asyncHandler = require("../utils");
const router = express.Router();

//Middleware
router.use(isLoggedIn);

//Enquiry routes with pagination
router.get("/:companyId", asyncHandler(getEnquiries));
router.get("/enquiry/:id", asyncHandler(getSingleEnquiry));
router.post("/reply", asyncHandler(sendResponse));

router.post("/mark-read", asyncHandler(markAsRead));
router.post("/delete", asyncHandler(deleteEnquiry));

//Send Enquiries
router.post('/send',asyncHandler(sendEnquiry));

module.exports = router;