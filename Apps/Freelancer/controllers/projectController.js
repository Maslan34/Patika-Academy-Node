const Project = require("../model/Project");
const fs = require("fs");
const path = require("path");

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

const goProjectPage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("single-project", { project });
  } catch (e) {
    console.log("Error finding project: ", e);
  }
};

const deleteProject = async (req, res) => {

  try {
    const projectDeleted = await Project.findByIdAndDelete(req.params.id);

    if (projectDeleted.photo) {
      const photoPath = path.join(
        __dirname,
        "..",
        "public",
        projectDeleted.photo
      );
      fs.unlink(photoPath, (err) => {
        if (err) {
          console.error("Error deleting photo:", err);
        } else {
          console.log("Photo deleted successfully");
        }
      });
    }

    const projects = await Project.find().sort({ dateCreated: -1 });
    res.render("index", { projects });
  } catch (e) {
    console.log("Error finding project: ", e);
  }
};

module.exports = { addPortfolio, goProjectPage, deleteProject };
