const express = require("express");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.route("/").get(pageController.goIndexPage);
router.route("/about").get(pageController.goAboutPage);
router.route("/login").get(redirectMiddleware,pageController.goLoginPage);
router.route("/signUp").get(redirectMiddleware,pageController.goSignUpPage);

module.exports = router;
