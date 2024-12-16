const User = require("../models/User");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.redirect("/login");
};

const getUser = async (req, res) => {
  const user = await User.findById(gloabalUserSessionId);
  res.status(200).render("dashboard",{user:user});
};

const login = async (req, res) => {
  const userFormData = req.body;

  let userDbData;
  try {
    userDbData = await User.findOne({ email: userFormData.email });

    if (userDbData) {
      bcrypt.compare(
        userFormData.password,
        userDbData.password,
        (err, same) => {
          // User Session

          if (same) {
            req.session.userSessionId = userDbData._id;
            //global.userIN=req.session.userSessionId
            console.log("Session") ;
            res.status(201).redirect("/users/dashboard");
          } else {
            //req.flash('error', 'Your password is incorrect!');
            res.redirect("/login");
          }

          // User Session
        }
      );
    } else {
      /*
      res.status(200).json({
        status: 'user not find',
      });*/

      //req.flash('error', 'User not exist!');
      res.redirect("/login");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  addNewUser,
  getUser,
  login,
  logout,
};
