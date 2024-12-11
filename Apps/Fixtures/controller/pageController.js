const goHomePage = (req, res) => {
  res.render("index");
};

const goAboutPage = (req, res) => {
  res.render("about");
};

const goContactPage = (req, res) => {
  res.render("contact");
};

const goLoginPage = (req, res) => {
  res.render("login");
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
