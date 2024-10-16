const { registerCompany, editCompany, getCompaniesBySubCategory, getCompanyDetails, getCompanies, exportCompanies, searchCompanies, addReview, getReviews } = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middlewares");

const upload = multer({ dest: "uploads" });

//Lisitng routes
router.post("/register", upload.fields([{ name: "logo" }]),isLoggedIn, registerCompany);
router.post("/edit", isAdmin, editCompany);

//Search and fetch routes
router.get("/name/:name", getCompanyDetails);
router.get("/category/:category", isLoggedIn, getCompanies);
router.get("/subcategory/:subCategory", isLoggedIn, getCompaniesBySubCategory);
router.get("/export/companies", isAdmin,  exportCompanies);
router.get("/search/:query",isLoggedIn, searchCompanies)

//Review routes
router.post("/review/add", isLoggedIn, addReview);
router.post("/review/all", isLoggedIn, getReviews);

module.exports = router;