const { registerCompany, editCompany, getCompaniesBySubCategory, getCompanyDetails, getCompanies, exportCompanies } = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");

const upload = multer({ dest: "uploads" });

router.post("/register", upload.fields([{ name: "logo" }]), registerCompany);
router.post("/edit", editCompany);
router.get("/name/:name", getCompanyDetails);
router.get("/category/:category", getCompanies);
router.get("/sub-category/:subCategory", getCompaniesBySubCategory);
router.get("/export/companies", exportCompanies);

module.exports = router;