const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  createDish,
  deleteDish,
} = require("../controllers/menuController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

router.use(isVerifiedUser);

router.route("/categories").get(getCategories).post(createCategory);
router.route("/categories/:categoryId").delete(deleteCategory);
router
  .route("/categories/:categoryId/dishes")
  .post(createDish);
router
  .route("/categories/:categoryId/dishes/:dishId")
  .delete(deleteDish);

module.exports = router;
