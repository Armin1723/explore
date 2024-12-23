const { isAdmin } = require("../middlewares");
const { asyncHandler } = require("../utils");

const {
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin/adminAuthController");

const {
  handleRequest,
  getRecentCompany,
  getRequests,
  getSuspendedCompanies,
  toggleSuspendCompany,
  exportCompanies,
  getCompanies,
} = require("../controllers/admin/adminCompanyController");

const {
  getReviewsSortedByFlags,
  deleteReview,
} = require("../controllers/admin/adminReviewController");

const {
  getAdminStats,
  getBanners,
} = require("../controllers/admin/AdminStatsController");

const {
  getUsers,
  toggleSuspendUser,
  getSuspendedUsers,
} = require("../controllers/admin/adminUserController");
const { getEnquiries, getSingleEnquiry, sendResponse, forwardResponseToCompany } = require("../controllers/admin/adminEnquiryController");

const router = require("express").Router();

//login as admin
router.post("/login", asyncHandler(loginAdmin));
router.get("/logout", asyncHandler(logoutAdmin));

//Get stats
router.get("/stats", isAdmin, asyncHandler(getAdminStats));

//Fetch all users and companies
router.get("/users", isAdmin, asyncHandler(getUsers));
router.get("/companies", isAdmin, asyncHandler(getCompanies));

//Export companies to CSV
router.get("/companies/export", isAdmin, asyncHandler(exportCompanies));

//Suspend user and companies.
router.post("/suspend/user", isAdmin, asyncHandler(toggleSuspendUser));
router.post("/suspend/company", isAdmin, asyncHandler(toggleSuspendCompany));

//Get suspended users and companies
router.get("/suspended/users", isAdmin, asyncHandler(getSuspendedUsers));
router.get(
  "/suspended/companies",
  isAdmin,
  asyncHandler(getSuspendedCompanies)
);

//Fetch reviews sorted by flags
router.get("/reviews", isAdmin, asyncHandler(getReviewsSortedByFlags));
router.delete("/reviews/:reviewId", isAdmin, asyncHandler(deleteReview));

//Handle requests
router.post("/requests/handle", isAdmin, asyncHandler(handleRequest));
router.get("/recent-request", isAdmin, asyncHandler(getRecentCompany));
router.get("/requests", isAdmin, asyncHandler(getRequests));

//Handle Enquiries
router.get("/enquiries", isAdmin, asyncHandler(getEnquiries));
router.get("/enquiries/:id", isAdmin, asyncHandler(getSingleEnquiry));
router.post("/enquiries/:id", isAdmin, asyncHandler(sendResponse));
router.get("/enquiries/:id/forward", isAdmin, asyncHandler(forwardResponseToCompany));

//Get Banners with pagination support
router.get("/banners", isAdmin, asyncHandler(getBanners));

module.exports = router;
