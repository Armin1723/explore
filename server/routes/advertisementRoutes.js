const { createAdvertisement, confirmAdvertisement, getBanners } = require("../controllers/advertisementController");
const { isLoggedIn } = require("../middlewares");

const router = require("express").Router();

router.post("/create", isLoggedIn, createAdvertisement);
router.post("/confirm", isLoggedIn, confirmAdvertisement);
router.get("/banners", isLoggedIn, getBanners);

module.exports = router;