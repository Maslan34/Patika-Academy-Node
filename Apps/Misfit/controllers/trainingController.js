const Training = require("../models/Training");
const User = require("../models/User");
const slugify = require("slugify");

const getAllTrainings = async (req, res) => {
  try {
    let filter={};
    if (req.query.q) {
      filter = { name: { $regex: req.query.q, $options: "i" } }; // Case-insensitive regex
    }
    const traningsFetched = await Training.find(filter).populate("trainer");
    console.log(traningsFetched);
    res.status(200).render("trainings",{trainings:traningsFetched,pageName:'training'});
    
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const createTraining = async (req, res) => {
  try {
    await Training.create({...req.body,trainer:userSessionID});
    req.flash("success", "Training Created successfully");
    res.redirect("/users/dashboard");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const deleteTraining = async (req, res) => {
  try {
 
    await Training.findOneAndDelete({slug:req.params.slug});
    req.flash("success", "Training Deleted successfully");
    res.redirect("/users/dashboard");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const updateTraining = async (req, res) => {
  try {
    const filter = { slug: req.params.slug };
    const update = { 
      ...req.body,
      slug: slugify(req.body.name),
      dateUpdated: new Date() 
    };
    const doc = await Training.findOneAndUpdate(filter, update, {
      new: true,
    });
    req.flash("success", "Training Updated successfully");
    res.redirect("/users/dashboard");
  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const getTraining = async (req, res) => {
  try {
  
    const trainingFetched = await Training.findOne({slug:req.params.slug}).populate("trainer")
    let user = null;
    if (userSessionID) {
      user = await User.findById(userSessionID);
    }
    res.render("training", {
      training: trainingFetched,
      user: user,
      pageName: "training",
    });

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};


const enrollTraining = async (req, res) => {
  try {
  
    const filter = { slug: req.params.slug };

    const update = { 
        dateUpdated: new Date(),
        $push: { members: userSessionID } 
    };
    const doc = await Training.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.redirect("/trainings");

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};

const cancelTraining = async (req, res) => {
  try {
  
    const filter = { slug: req.params.slug };

    const update = { 
      dateUpdated: new Date(),
      $pull: { members: userSessionID } 
    };

    const doc = await Training.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.redirect("/trainings");

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(400).render("errors/400", { pageName: "index" });
  }
};



module.exports = {
  getAllTrainings,
  createTraining,
  deleteTraining,
  updateTraining,
  getTraining,
  enrollTraining,
  cancelTraining
};
