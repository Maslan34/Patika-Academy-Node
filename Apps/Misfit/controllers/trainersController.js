const User = require("../models/User");

const goTrainersPage = async (req, res) => {
  const trainersFetched = await User.find({ role: "TRAINER" });
  res.render("trainers", { trainers: trainersFetched,pageName:"trainer" });
};

module.exports = { goTrainersPage };
