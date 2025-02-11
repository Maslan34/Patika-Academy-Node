const User = require("../models/User");
const Category = require("../models/Category");
const Training = require("../models/Training");

const goDashboardPage = async (req, res) => {
  const user = await User.findById(userSessionID);
  const categoriesFetched = await Category.find();
  const pageName = {pageName:"dashboard"};
  if (user.role === "ADMIN") {
    const usersFetched = await User.find(
      {$or:[
       {role:"TRAINER"},{role:"MEMBER"}
      ]}
    );
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
    const user = await User.findByIdAndDelete(req.params.id)
    req.flash("success", "User Deleted successfully");
    res.redirect("/users/dashboard");

  } catch (err) {
    console.log("Error Occured:", err.message);
    req.flash("error", "User Did Not Deleted");
    res.redirect("/users/dashboard");
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
    req.flash("success", "User Updated successfully");
    res.redirect("/users/dashboard");

  } catch (err) {
    console.log("Error Occured:", err.message);
    req.flash("error", "User Did Not Deleted");
    res.redirect("/users/dashboard");
  }
};





module.exports = {
  goDashboardPage,
  deleteUser,
  updateUser
};
