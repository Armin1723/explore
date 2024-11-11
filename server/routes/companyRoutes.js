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
  getTrendingCompanies,
  getSimilarCompanies,
  getReview,
} = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");

const { isLoggedIn } = require("../middlewares");

const upload = multer({ dest: "/tmp" });

const companyRoutes = (io) => {
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
    upload.fields([
      { name: "logo" },
      { name: "banner" },
      { name: "gallery", maxCount: 5 }
    ]),
    (req, res) => editCompany(req, res, io)
  );

  //Search and fetch routes
  router.get("/name/:name", getCompanyDetails);
  router.get('/', getCompanies);
  router.get(
    "/subcategory/:subCategory",
    isLoggedIn,
    getCompaniesBySubCategory
  );
  router.get("/search", searchCompanies);
  router.get("/trending", getTrendingCompanies);
  router.get("/similar", getSimilarCompanies);

  //Review routes
  router.post("/review/add", isLoggedIn, addReview);
  router.post("/review/all", isLoggedIn, getReviews);
  router.get("/review/flag/:reviewId", isLoggedIn, flagReview);
  router.get('/review/:id', getReview);

  return router;
};

module.exports = companyRoutes;
