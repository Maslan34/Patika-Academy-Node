const express = require('express');
const categoriesController = require('../controller/categoriesController');

const router = express.Router();

router.route('/').post(categoriesController.addNewCategories);
router.route('/').get(categoriesController.getAllCategories);
router.route('/:id').get(categoriesController.getCategory);






module.exports = router;