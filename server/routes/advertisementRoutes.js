const { createAdvertisement, confirmAdvertisement } = require("../controllers/advertisementController");
const { isLoggedIn } = require("../middlewares");

const router = require("express").Router();

router.post("/create", isLoggedIn, createAdvertisement);
router.post("/confirm", isLoggedIn, confirmAdvertisement);

module.exports = router;