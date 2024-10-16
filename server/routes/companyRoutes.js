const { registerCompany, editCompany, getCompaniesBySubCategory, getCompanyDetails, getCompanies, exportCompanies, searchCompanies } = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");

const upload = multer({ dest: "uploads" });

router.post("/register", upload.fields([{ name: "logo" }]), registerCompany);
router.post("/edit", editCompany);
router.get("/name/:name", getCompanyDetails);
router.get("/category/:category", getCompanies);
router.get("/subcategory/:subCategory", getCompaniesBySubCategory);
router.get("/export/companies", exportCompanies);
router.get("/search/:query", searchCompanies)

module.exports = router;