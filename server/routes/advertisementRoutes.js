const { createAdvertisement, confirmAdvertisement, getBanners, removeBanner } = require("../controllers/advertisementController");
const { isLoggedIn, isAdmin } = require("../middlewares");

const router = require("express").Router();

router.post("/create", isLoggedIn, createAdvertisement);
router.post("/confirm", isLoggedIn, confirmAdvertisement);
router.get("/banners", getBanners);
router.put("/banner/:name", isAdmin, removeBanner);

module.exports = router;