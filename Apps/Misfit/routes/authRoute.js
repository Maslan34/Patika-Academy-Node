const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/dashboard").get(authMiddleware,userController.goDashboardPage);
router.route("/signUp").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authMiddleware,authController.logout);


module.exports = router;
