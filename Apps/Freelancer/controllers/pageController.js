const Project = require("../model/Project");

const getIndex = async (req, res) => {
  const projects = await Project.find().sort({ dateCreated: -1 });
    res.render("index", { projects });
};

const getAddPortfolio = (req, res) => {
  res.render("addPortfolio");
};


module.exports = { getIndex, getAddPortfolio };
