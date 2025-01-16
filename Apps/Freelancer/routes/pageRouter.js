const express = require("express");
const pageController = require("../controllers/pageController");


const router = express.Router();

router.route("/").get(pageController.getIndex);
router.route("/addPortfolio").get(pageController.getAddPortfolio);


module.exports = router;
