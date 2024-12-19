const {
  createAdvertisement,
  confirmAdvertisement,
  getBanners,
  removeBanner,
} = require("../controllers/advertisementController");
const { isLoggedIn, isAdmin } = require("../middlewares");
const asyncHandler = require("../utils");

const router = require("express").Router();

router.post("/create", isLoggedIn, asyncHandler(createAdvertisement));
router.post("/confirm", isLoggedIn, asyncHandler(confirmAdvertisement));
router.get("/banners", asyncHandler(getBanners));
router.put("/banner/:name", isAdmin, asyncHandler(removeBanner));

module.exports = router;
