const express = require('express');
const furnitureController = require('../controller/furnitureController');

const router = express.Router();

router.route('/').post(furnitureController.addNewFurniture);
router.route('/').get(furnitureController.getAllFurnitures);
router.route('/:slug').get(furnitureController.getFurniture);
router.route('/:slug').delete(furnitureController.deleteFurniture);
router.route('/:slug').put(furnitureController.updateFurniture);






module.exports = router;