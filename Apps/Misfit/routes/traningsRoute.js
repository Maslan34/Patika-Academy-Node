const express = require("express");
const trainingsController = require("../controllers/trainingsController");

const router = express.Router();

router.route("/").get(trainingsController.getAllTrainings);
router.route("/").post(trainingsController.createTraining);
router.route("/:id").delete(trainingsController.deleteTraining);
router.route("/:id").put(trainingsController.updateTraining);

module.exports = router;
