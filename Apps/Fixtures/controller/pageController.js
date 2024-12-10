const goHomePage = (req, res) => {
  res.render("index");
};

const goAboutPage = (req, res) => {
  res.render("about");
};

const goContactPage = (req, res) => {
  res.render("contact");
};

module.exports = {
  goHomePage,
  goAboutPage,
  goContactPage,
};
