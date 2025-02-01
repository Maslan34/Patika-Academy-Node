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


module.exports = {
  goIndexPage,
  goAboutPage,
  goLoginPage,
  goSignUpPage
};
