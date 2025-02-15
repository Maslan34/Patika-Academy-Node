const User = require('../models/User');
const bcrypt = require('bcrypt');
const signUp = async (req, res) => {
    try {
       const user = await User.create(req.body);
       return res.status(200).json({ redirect: "/login" });
      } catch (err) {
        console.log("Error Occured:", err.message);
        if (err.code === 11000) {
          // MongoDB Duplicate Key Error (E11000)
          return res.status(400).json({
              errors: [{ path: "email", msg: "This email is already registered" }]
          });}
          else{
            res.status(400).render("errors/400", { pageName: "index" });
          }
       
      }
  };

  const login = async (req, res) => {
    try {
     
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
          res.send("User Not Found");
        }

      
        const passwordCheck = await bcrypt.compare(req.body.password, user.password);

        if (passwordCheck) {
            req.session.userSession=user._id
            //res.send("Login successful");
            res.redirect("/users/dashboard");

        } else {
          res.send("Password Failed");
        }
    } catch (err) {
        console.log("Error Occurred:", err.message);
        res.status(400).render("errors/400", { pageName: "index" });
    }
};

const logout = async (req, res) => {
  try {
      req.session.destroy();
      res.redirect("/")
  } catch (err) {
      console.log("Error Occurred:", err.message);
      res.status(400).render("errors/400", { pageName: "index" });
  }
};

  

  module.exports = {
    signUp,
    login,
    logout
  };
  