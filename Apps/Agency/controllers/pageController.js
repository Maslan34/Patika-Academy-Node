const Portfolio = require("../model/Portfolio");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');



const goIndex = async (req, res) => {

  const portfoliosReceived = await Portfolio.find();

  res.status(200).render("index",{
    portfolios:portfoliosReceived
  });
};

const goAdd = (req, res) => {
  res.status(200).render("add");
};

const savePortfolio = (req, res) => {
  try {
    //console.log(req.body);
    //console.log(req.files)
    //console.log(__dirname);

    const image = req.files.photo;
    const uploadDir = "public/uploads/";
    const uniqueImage = uuidv4() + path.extname(req.files.photo.name); // Dosyanın uzantısını koruyarak unıqie yapma
    const fullDir = path.join(__dirname, "..", uploadDir,uniqueImage);
    //console.log(fullDir);


    if (!fs.existsSync(uploadDir)) {
      //burası uploads klasörü yoksa oluşturur.
      fs.mkdirSync(uploadDir);
    }
    
    image.mv(fullDir, async () => {
      const portfolio = await Portfolio.create({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        category: req.body.category,
        photo: uniqueImage,
      });

      // console.log("Oluşturulan portfolio")
      //console.log(portfolio);
    });

    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  goIndex,
  goAdd,
  savePortfolio,
};
