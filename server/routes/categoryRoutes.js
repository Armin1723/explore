const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { isAdmin } = require("../middlewares");
const asyncHandler = require("../utils");

const router = require("express").Router();

router.get("/", asyncHandler(getCategories));
router.post("/", isAdmin, asyncHandler(createCategory));

module.exports = router;
