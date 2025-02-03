const express = require("express");
const trainingsController = require("../controllers/trainingController");
const crudMiddleware = require("../middlewares/crudMiddleware");

const router = express.Router();

router.route("/").get(trainingsController.getAllTrainings);
router.route("/").post(crudMiddleware( ["ADMIN","TRAINER"]),trainingsController.createTraining);
router.route("/:slug").get(trainingsController.getTraining);
router.route("/:id").delete(crudMiddleware(["ADMIN","TRAINER"]),trainingsController.deleteTraining);
router.route("/:id").put(crudMiddleware( ["ADMIN","TRAINER"]),trainingsController.updateTraining);

module.exports = router;
