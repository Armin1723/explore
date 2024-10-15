const router = require("./userRoutes");


router.post("/register", registerCompany);
router.post("/edit", editCompany);
router.get("/:name", getCompanyDetails);
router.get("/sub-category/:subCategory", getCompaniesBySubCategory);

module.exports = router;