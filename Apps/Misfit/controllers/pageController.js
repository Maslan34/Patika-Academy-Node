const goIndexPage = (req, res) => {
  res.render("index", { pageName: "index" });
};
const goAboutPage = (req, res) => {
  res.render("about", { pageName: "about" });
};

module.exports = {
  goIndexPage,
  goAboutPage,
};
