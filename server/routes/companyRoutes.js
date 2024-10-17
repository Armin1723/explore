const {
  registerCompany,
  editCompany,
  getCompaniesBySubCategory,
  getCompanyDetails,
  getCompanies,
  searchCompanies,
  addReview,
  getReviews,
  flagReview,
} = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");
const { isLoggedIn } = require("../middlewares");

const upload = multer({ dest: "uploads" });

//Listing routes
router.post(
  "/register",
  upload.fields([{ name: "logo" }]),
  isLoggedIn,
  registerCompany
);
router.post(
  "/:companyId/edit",
  isLoggedIn,
  upload.fields([{ name: "logo" }, { name: "banner" }, { name: "gallery" }]),
  editCompany
);

//Search and fetch routes
router.get("/name/:name", getCompanyDetails);
router.get("/category/:category", isLoggedIn, getCompanies);
router.get("/subcategory/:subCategory", isLoggedIn, getCompaniesBySubCategory);
router.get("/search/:query", isLoggedIn, searchCompanies);

//Review routes
router.post("/review/add", isLoggedIn, addReview);
router.post("/review/all", isLoggedIn, getReviews);
router.get("/review/flag/:reviewId", isLoggedIn, flagReview);

module.exports = router;
