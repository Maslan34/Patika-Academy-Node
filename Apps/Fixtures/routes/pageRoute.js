const express = require('express');
const pageController = require('../controller/pageController');

const router = express.Router();

router.route('/about').get(pageController.goHomePage);
router.route('/about').get(pageController.goAboutPage);
router.route('/contact').get(pageController.goContactPage);





module.exports = router;