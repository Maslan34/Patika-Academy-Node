const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.route("/").get(pageController.goIndexPage);
router.route("/about").get(pageController.goAboutPage);

module.exports = router;
