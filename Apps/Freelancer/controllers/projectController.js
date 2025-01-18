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
      await fs.promises.unlink(photoPath, (err) => {
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

const goUpdatePage = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    res.render("update-project", { project });
  } catch (e) {
    console.log("Error finding project: ", e);
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
        console.log(photoPath);
        await fs.promises.unlink(photoPath, (err) => {
          if (err) {
            console.error(
              "An error occurred while deleting the photo during the update: ",
              err
            );
          } else {
            console.log("Photo deleted successfully ");
          }
        });
      }

      updatedProject.photo = `/uploads/${updatedFile.filename}`;
      updatedProject.dateUpdated = Date.now();

      newProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        updatedProject,
        { new: true }
      );
    } else {
      // if clinet not uploads  phot
      updatedProject.dateUpdated = Date.now();
      newProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        updatedProject,
        { new: true }
      );
    }

    //console.log(newProject);

    const projects = await Project.find().sort({ dateCreated: -1 });
    res.render("index", { projects });
  } catch (e) {
    console.log("Error finding project: ", e);
  }
};

module.exports = {
  addPortfolio,
  goProjectPage,
  deleteProject,
  goUpdatePage,
  updateProject,
};
