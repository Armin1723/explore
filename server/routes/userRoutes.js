const router = require("express").Router();
const multer = require("multer");

const upload = multer({ dest: "/tmp" });

const {
  loginUser,
  registerUser,
  verifyUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  toggleSavedCompany,
  fetchUserById,
  editUser,
  fetchSavedCompanies,
  fetchReviewedCompanies,
  resendOtp,
  verifyOtp,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares");
const { asyncHandler } = require("../utils");

const userRoutes = (io) => {
  //Auth Routes
  router.post("/login", asyncHandler(loginUser));
  router.post(
    "/register",
    upload.fields([{ name: "profilePic" }]),
    asyncHandler((req, res, next) => registerUser(req, res, next, io))
  );
  router.get("/verify", asyncHandler(verifyUser));
  router.post("/verify-otp", asyncHandler(verifyOtp));
  router.post("/resend-otp", asyncHandler(resendOtp));
  router.get("/logout", asyncHandler(logoutUser));

  //Account Management Routes
  router.post("/forgot-password", asyncHandler(forgotPassword));
  router.post("/reset-password", asyncHandler(resetPassword));
  router.post(
    "/edit-profile",
    isLoggedIn,
    upload.fields([{ name: "profilePic" }]),
    asyncHandler(editUser)
  );

  //Wishlist Routes
  router.post("/toggle-bookmark", isLoggedIn, asyncHandler(toggleSavedCompany));

  //Fetch User
  router.get("/:id", asyncHandler(fetchUserById));

  //Fetch Saved Companies
  router.get("/:id/saved", isLoggedIn, asyncHandler(fetchSavedCompanies));

  //Fetch Reviewed Companies
  router.get(
    "/:id/reviewed-companies",
    isLoggedIn,
    asyncHandler(fetchReviewedCompanies)
  );

  return router;
};

module.exports = userRoutes;
