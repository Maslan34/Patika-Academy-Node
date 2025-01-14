const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchmema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("projects", ProjectSchmema);
module.exports = Project;
