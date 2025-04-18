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
    res.status(500).send("An error occurred while uploading the project.");
  }
};

const goProjectPage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("single-project", { project });
  } catch (e) {
    console.log("Error finding project: ", e);
    res.status(500).send("An error occurred while finding the project.");
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectDeleted = await Project.findByIdAndDelete(req.params.id);

    if (projectDeleted && projectDeleted.photo) {
      const photoPath = path.join(
        __dirname,
        "..",
        "public",
        projectDeleted.photo
      );
      await fs.promises.unlink(photoPath);
      console.log("Photo deleted successfully");
    }

    const projects = await Project.find().sort({ dateCreated: -1 });
    res.render("index", { projects });
  } catch (e) {
    console.log("Error deleting project: ", e);
    res.status(500).send("An error occurred while deleting the project.");
  }
};

const goUpdatePage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render("update-project", { project });
  } catch (e) {
    console.log("Error finding project: ", e);
    res.status(500).send("An error occurred while finding the project.");
  }
};

const updateProject = async (req, res) => {
  try {
    let newProject;

    const updatedFile = req.file;
    const updatedProject = req.body;
    console.log(updatedFile);

    // if client uploads a new photo
    if (updatedFile) {
      // Before updating the document,first its files are deleted from the system and then updated.

      const oldProject = await Project.findById(req.params.id);
      if (oldProject.photo) {
        const photoPath = path.join(
          __dirname,
          "..",
          "public",
          oldProject.photo
        );
        //console.log(photoPath);
        await fs.promises.unlink(photoPath);
        console.log("Photo deleted successfully ");
      }

      updatedProject.photo = `/uploads/${updatedFile.filename}`;
      updatedProject.dateUpdated = Date.now();

      newProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        updatedProject,
        { new: true }
      );
    } else {
      // if client does not upload a photo
      updatedProject.dateUpdated = Date.now();
      newProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        updatedProject,
        { new: true }
      );
    }

    // console.log(newProject);
    
    const projects = await Project.find().sort({ dateCreated: -1 });
    res.render("index", { projects });
  } catch (e) {
    console.log("Error updating project: ", e);
    res.status(500).send("An error occurred while updating the project.");
  }
};

module.exports = {
  addPortfolio,
  goProjectPage,
  deleteProject,
  goUpdatePage,
  updateProject,
};