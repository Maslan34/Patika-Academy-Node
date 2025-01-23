const Project = require("../model/Project");

const getIndex = async (req, res) => {
  try {

    // pagination 
    const totalProjects = await Project.find().countDocuments();
    const projectsPerPage = 3;
    const totalPages = Math.ceil(totalProjects / projectsPerPage);
    let currentPage;

    // if client set page param as inoppriate value 
    if (req.query.page > totalPages || req.query.page < 1) {
      currentPage = 1;
    } else {
      currentPage = Number(req.query.page) || 1;
    }

    const offset = projectsPerPage * (currentPage - 1);
    const projects = await Project.find()
      .sort({ dateCreated: -1 })
      .limit(projectsPerPage)
      .skip(offset);

    //console.log(typeof(totalPages),typeof(currentPage));
    //console.log(totalPages, currentPage);

    res.render("index", { projects, totalPages, currentPage });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAddPortfolio = (req, res) => {
  res.render("addPortfolio");
};

module.exports = { getIndex, getAddPortfolio };
