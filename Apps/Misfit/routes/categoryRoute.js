const express = require("express");
const categoryController = require("../controllers/categoryController");
const crudMiddleware = require("../middlewares/crudMiddleware"); 

const router = express.Router();

router.route("/").post(crudMiddleware(["ADMIN"]),categoryController.createCategory);
router.route("/:slug").delete(crudMiddleware(["ADMIN"]),categoryController.deleteCategory);
router.route("/:slug").put(crudMiddleware(["ADMIN"]),categoryController.updateCategory);
//router.route("/").get(categoryController.getCategories);


module.exports = router;
