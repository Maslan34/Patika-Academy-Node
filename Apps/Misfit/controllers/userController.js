const User = require("../models/User");
const Category = require("../models/Category");
const Training = require("../models/Training");

const goDashboardPage = async (req, res) => {
  const user = await User.findById(userSessionID);
  const categoriesFetched = await Category.find();
  const pageName = {pageName:"dashboard"};
  
  if (user.role === "ADMIN") {
    const usersFetched = await User.find();
    res.render("admin/dashboard", { pageName,users:usersFetched,categories:categoriesFetched });
  } else if (user.role === "MEMBER") {
    const trainingsFetched = await Training.find({ members: userSessionID });
    res.render("members/dashboard", {
      pageName,
      trainings: trainingsFetched,
    });
  } else {
    const trainingsFetched = await Training.find({ trainer: userSessionID });
    res.render("trainers/dashboard", {
      pageName,
      categories: categoriesFetched,
      trainings: trainingsFetched,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const filter = {}
    const update = {}
    const user = await User.findByIdAndDelete(filter,update)
    res.redirect("/users/dashboard");

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(401).render("errors/401", { pageName: "index" });
  }
};

const updateUser = async (req, res) => {
  try {
  
    const filter = { _id: req.params.id };

    const update = { 
      ...req.body,
      dateUpdated: new Date() 
    };
  
    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(doc);
    res.redirect("/users/dashboard");

  } catch (err) {
    console.log("Error Occured:", err.message);
    res.status(401).render("errors/401", { pageName: "index" });
  }
};





module.exports = {
  goDashboardPage,
  deleteUser,
  updateUser
};
