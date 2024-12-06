const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.goIndex);
router.route('/add').get(pageController.goAdd);
router.route('/add').post(pageController.savePortfolio);


module.exports = router;