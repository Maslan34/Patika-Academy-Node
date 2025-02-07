const express = require("express");
const trainingsController = require("../controllers/trainingController");
const crudMiddleware = require("../middlewares/crudMiddleware");

const router = express.Router();

router.route("/").get(trainingsController.getAllTrainings);
router.route("/").post(crudMiddleware( ["ADMIN","TRAINER"]),trainingsController.createTraining);
router.route("/:slug").get(trainingsController.getTraining);
router.route("/:slug").delete(crudMiddleware(["ADMIN","TRAINER"]),trainingsController.deleteTraining);
router.route("/:slug").put(crudMiddleware( ["ADMIN","TRAINER"]),trainingsController.updateTraining);
router.route("/:slug/enroll").post(trainingsController.enrollTraining);
router.route("/:slug/cancel").post(trainingsController.cancelTraining);

module.exports = router;
