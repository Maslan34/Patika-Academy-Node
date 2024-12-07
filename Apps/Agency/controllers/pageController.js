const Portfolio = require("../model/Portfolio");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const goIndex = async (req, res) => {
  const portfoliosReceived = await Portfolio.find();

  res.status(200).render("index", {
    portfolios: portfoliosReceived,
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
    const fullDir = path.join(__dirname, "..", uploadDir, uniqueImage);
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

const deletePortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.id;
    //console.log(portfolioId);
    const portfolio = await Portfolio.findById(req.params.id);

    const uploadDir = path.join(
      __dirname,
      "..",
      "public/uploads",
      portfolio.photo
    );
    //console.log(uploadDir);
    fs.unlink(uploadDir, (err) => {
      if (err) {
        console.error("Dosya silinirken bir hata oluştu:", err);
        return;
      }
      //console.log('Dosya başarıyla silindi.');
    });

    const deletedPortfolio = await Portfolio.findByIdAndDelete(portfolioId);

    //console.log(deletedPortfolio);

    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


const goEditPortfolio = async (req, res) => {
  try {

    const portfoliosReceived = await Portfolio.findOne ({_id:req.params.id})

    //console.log(portfoliosReceived)
    res.status(200).render("edit",{
      portfolio:portfoliosReceived
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const editPortfolio = async (req, res) => {
  try {
    
    let photoPath;

    const portfolioId = req.params.id;
    //console.log(portfolioId)
    //console.log(req.files)

    if(req.files){

      const image = req.files.photo;

      const portfolio = await Portfolio.findOne({_id: portfolioId})
      
      const oldImage = portfolio.photo;
      
      const uploadDir = path.join(__dirname, "..", "public", "uploads");
   
      const fullDir = path.join(uploadDir, oldImage);
    
      fs.unlink(fullDir, (err) => {
        if (err) {
          console.error("Dosya silinirken bir hata oluştu:", err);
          return;
        }});
        const uniqueImage = uuidv4() + path.extname(req.files.photo.name);

        const uniqueImagePath = path.join(uploadDir,uniqueImage)
        console.log(uniqueImagePath)

        image.mv(uniqueImagePath, async () => {
          console.log("Yeni Foto Eklendi")
        }
        )
        
        photoPath=uniqueImage;
      }else{
        //console.log("here")
        //console.log(req.body)
  
      }
      
      //console.log(photoPath);

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      {
        name:req.body.name,
        category:req.body.category,
        email:req.body.email,
        photo:photoPath,
        description:req.body.description,
        dateUpdated:Date.now(),

      },
      { new: true } 
    )
    
    res.status(200).redirect("/");
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
  deletePortfolio,
  goEditPortfolio,
  editPortfolio
  
};
