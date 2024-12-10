const express = require('express');
const furnitureController = require('../controller/furnitureController');

const router = express.Router();

router.route('/').post(furnitureController.addNewFurniture);
router.route('/').get(furnitureController.getAllFurnitures);
router.route('/:id').get(furnitureController.getFurniture);
router.route('/:id').delete(furnitureController.deleteFurniture);
router.route('/:id').put(furnitureController.updateFurniture);






module.exports = router;