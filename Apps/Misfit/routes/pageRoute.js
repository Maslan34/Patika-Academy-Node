const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.route("/").get(pageController.goIndexPage);
router.route("/about").get(pageController.goAboutPage);
router.route("/login").get(pageController.goLoginPage);
router.route("/signUp").get(pageController.goSignUpPage);

module.exports = router;
