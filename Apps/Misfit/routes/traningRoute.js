const express = require("express");
const trainingsController = require("../controllers/trainingController");

const router = express.Router();

router.route("/").get(trainingsController.getAllTrainings);
router.route("/").post(trainingsController.createTraining);
router.route("/:slug").get(trainingsController.getTraining);
router.route("/:id").delete(trainingsController.deleteTraining);
router.route("/:id").put(trainingsController.updateTraining);

module.exports = router;
