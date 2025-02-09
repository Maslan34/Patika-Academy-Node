const express = require("express");
const trainersController = require("../controllers/trainersController");

const router = express.Router();

router.route("/").get(trainersController.goTrainersPage);


module.exports = router;
