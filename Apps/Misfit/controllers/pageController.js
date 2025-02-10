const nodemailer = require("nodemailer");
require('dotenv').config()

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_MAIL,  
    pass: process.env.GMAIL_PASSWORD,  
  },
});


const goIndexPage = (req, res) => {
  res.render("index", { pageName: "index" });
};
const goAboutPage = (req, res) => {
  res.render("about", { pageName: "about" });
};

const goLoginPage = (req, res) => {
  res.render("login", { pageName: "login" });
};

const goSignUpPage = (req, res) => {
  res.render("signUp", { pageName: "signUp" });
};

const goContactPage = (req, res) => {
  res.render("contact", { pageName: "contact" });
};

const contactUs = (req, res) => {

// Mail Content
const mailOptions = {
  from: process.env.GMAIL_MAIL,
  to: req.body.email,
  subject:  `About Your ${req.body.subject} Mail`,
  text: `Hi ${req.body.name}! We Reacieved your email, we will  message you as soon as possible`,
};
  // Sending Mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error Occured: ", error);
  } else {
    console.log("Mail Sent: ", info.response);
  }
});

  res.redirect("/")
};





module.exports = {
  goIndexPage,
  goAboutPage,
  goLoginPage,
  goSignUpPage,
  goContactPage,
  contactUs
};
