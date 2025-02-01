const Training = require("../models/Training");

const getAllTrainings = async (req, res) => {
  try {
    const traningsFetched = await Training.find();
    res.status(200).render("trainings",{trainings:traningsFetched,pageName:'training'});
    
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const createTraining = async (req, res) => {
  try {
    await Training.create(req.body);
    res.status(201).redirect("/trainings");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const deleteTraining = async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.redirect("/trainings");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const updateTraining = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const doc = await Training.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.redirect("/trainings");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const getTraining = async (req, res) => {
  try {
  
    const trainingFetched = await Training.findOne({slug:req.params.slug})
    res.render("training",{training:trainingFetched,pageName:'training'});

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};


getTraining
module.exports = {
  getAllTrainings,
  createTraining,
  deleteTraining,
  updateTraining,
  getTraining
};
