const { registerCompany, editCompany, getCompaniesBySubCategory, getCompanyDetails, getCompanies, exportCompanies, searchCompanies } = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middlewares");

const upload = multer({ dest: "uploads" });

router.post("/register", upload.fields([{ name: "logo" }]),isLoggedIn, registerCompany);
router.post("/edit", isAdmin, editCompany);
router.get("/name/:name", getCompanyDetails);
router.get("/category/:category", isLoggedIn, getCompanies);
router.get("/subcategory/:subCategory", isLoggedIn, getCompaniesBySubCategory);
router.get("/export/companies", isAdmin,  exportCompanies);
router.get("/search/:query",isLoggedIn, searchCompanies)

module.exports = router;