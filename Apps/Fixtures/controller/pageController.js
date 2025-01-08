const Furniture = require('../models/Furniture')
const User = require('../models/User');

const goHomePage = async (req, res) => {
  try {
    const user = await User.findById(gloabalUserSessionId);
    const getAllFurnitures = await Furniture.find();
    res.render("index",{ furnitures: getAllFurnitures,user:user});

  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching furnitures", details: error.message });
  }

};

const goAboutPage = (req, res) => {
  res.render("about");
};

const goContactPage = (req, res) => {
  res.render("contact");
};

const goLoginPage = async (req, res) => {
  const user = await User.findById(gloabalUserSessionId);
  res.render("login", {user: user});
};

const goRegisterPage = (req, res) => {
  res.render("register");
};

module.exports = {
  goHomePage,
  goAboutPage,
  goContactPage,
  goLoginPage,
  goRegisterPage
};
