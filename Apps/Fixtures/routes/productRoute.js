const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.route('/').post(productController.addNewProduct);
router.route('/').get(productController.getAllProducts);
router.route('/:slug').get(productController.getProduct);
router.route('/:slug').delete(productController.deleteProduct);
router.route('/:slug').put(productController.updateProduct);
router.route('/:slug/reserve').post(productController.reserveProduct);
router.route('/:slug/cancel').post(productController.cancelProduct);



module.exports = router;