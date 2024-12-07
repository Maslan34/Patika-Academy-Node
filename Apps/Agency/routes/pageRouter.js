const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.goIndex);
router.route('/add').get(pageController.goAdd);
router.route('/add').post(pageController.savePortfolio);
router.route('/delete-project/:id').post(pageController.deletePortfolio);
router.route('/edit-project/:id').get(pageController.goEditPortfolio);
router.route('/edit-project/:id').post(pageController.editPortfolio);



module.exports = router;