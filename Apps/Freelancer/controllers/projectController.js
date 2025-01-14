const Project = require("../model/Project");


const addPortfolio = async (req, res) => {
  try {
    const uploadedFile = req.file;
    const projectData = req.body;
    if (uploadedFile) {
    
      projectData.photo = `/uploads/${uploadedFile.filename}`;
    }
    await Project.create(projectData);
    res.redirect("/addPortfolio");
  } catch (e) {
    console.log("Error uploading project: ", e);
  }
};

module.exports = { addPortfolio };
