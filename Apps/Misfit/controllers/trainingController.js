const Training = require("../models/Training");
const User = require("../models/User");
const slugify = require("slugify");
const Category = require("../models/Category");
const getAllTrainings = async (req, res) => {
  try {
    let filter = {};
    let categoryParam = req.query.category || "";
    let searchQuery = req.query.q || "";

    // Add category filter if exists

    if (categoryParam) {
      const category = await Category.findOne({ name: categoryParam });
      if (category) {
        filter.category = category._id;
      } else {
        return res.status(200).render("trainings", {
          trainings: [],
          pageName: "training",
          categories: await Category.find(),
          currentPage: 1,
          totalPages: 1,
          totalTrainings: 0,
          category: categoryParam, // Sending Category to Template 
          q: searchQuery, //Send search query to template

   
        });
      }
    }

    // Add search filter if exists
    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: "i" };
    }

    // Find the total number of trainings that fit the filter

    const totalTrainings = await Training.countDocuments(filter);
    const trainingPerPage = 4;
    const totalPages = Math.max(1, Math.ceil(totalTrainings / trainingPerPage));
    let currentPage = Number(req.query.page) || 1;

    // If an invalid page , redirect to page 1.

    if (currentPage > totalPages || currentPage < 1) {
      currentPage = 1;
    }

    const offset = trainingPerPage * (currentPage - 1);


    const trainings = await Training.find(filter)
      .populate("trainer")
      .sort({ dateCreated: -1 })
      .limit(trainingPerPage)
      .skip(offset);

    const categoriesFetched = await Category.find();

    res.status(200).render("trainings", {
      trainings,
      pageName: "training",
      categories: categoriesFetched,
      currentPage,
      totalPages,
      totalTrainings,
      category: categoryParam, 
      q: searchQuery, 
    });
  } catch (err) {
    console.log("Error Occurred:", err.message);
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
