const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

const Training = mongoose.model("trainings", trainingSchema);

module.exports = Training;
