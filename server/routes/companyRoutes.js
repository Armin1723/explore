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
  getPlaceholderCompany,
} = require("../controllers/companyController");
const router = require("express").Router();
const multer = require("multer");

const { isLoggedIn } = require("../middlewares");
const { asyncHandler } = require("../utils");

const upload = multer({ dest: "/tmp" });

const companyRoutes = (io) => {
  //Listing routes
  router.post(
    "/register",
    upload.fields([{ name: "logo" }]),
    isLoggedIn,
    asyncHandler(registerCompany)
  );
  router.post(
    "/:companyId/edit",
    isLoggedIn,
    upload.fields([
      { name: "logo" },
      { name: "banner" },
      { name: "gallery", maxCount: 5 },
    ]),
    asyncHandler((req, res, next) => editCompany(req, res, next, io))
  );

  //Search and fetch routes
  router.get("/slug/:slug", asyncHandler(getCompanyDetails));
  router.get("/", asyncHandler(getCompanies));
  router.get(
    "/subcategory/:subCategory",
    isLoggedIn,
    asyncHandler(getCompaniesBySubCategory)
  );
  router.get("/search", asyncHandler(searchCompanies));
  router.get("/trending", asyncHandler(getTrendingCompanies));
  router.get("/similar", asyncHandler(getSimilarCompanies));
  router.get("/placeholder", asyncHandler(getPlaceholderCompany));

  //Review routes
  router.post("/review/add", isLoggedIn, asyncHandler(addReview));
  router.post("/review/all", isLoggedIn, asyncHandler(getReviews));
  router.get("/review/flag/:reviewId", isLoggedIn, asyncHandler(flagReview));
  router.get("/review/:id", asyncHandler(getReview));

  return router;
};

module.exports = companyRoutes;
