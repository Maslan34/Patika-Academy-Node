const express = require('express');
const pageController = require('../controller/pageController');

const router = express.Router();
router.route('/').get(pageController.goHomePage);
router.route('/about').get(pageController.goAboutPage);
router.route('/contact').get(pageController.goContactPage);
router.route('/login').get(pageController.goLoginPage);
router.route('/register').get(pageController.goRegisterPage);





module.exports = router;