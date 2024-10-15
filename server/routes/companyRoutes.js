const { registerCompany, editCompany, getCompaniesBySubCategory, getCompanyDetails } = require("../controllers/companyController");
const router = require("./userRoutes");
const multer = require("multer");

const upload = multer({ dest: "uploads" });

router.post("/register",upload.fields([{name : 'logo'}]) ,registerCompany);
router.post("/edit", editCompany);
router.get("/:name", getCompanyDetails);
router.get("/sub-category/:subCategory", getCompaniesBySubCategory);

module.exports = router;