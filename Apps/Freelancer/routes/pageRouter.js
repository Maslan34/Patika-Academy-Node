const express = require("express");
const pageController = require("../controllers/pageController");
const projectController = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create uploads folder unless exists
    const uploadDir = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
     // Creating a shorter file name using Date.now() and file extension
     const extname = path.extname(file.originalname);
     const shortFileName = Date.now() + extname;
     cb(null, shortFileName);
  },
});

const upload = multer({ storage: storage });


const router = express.Router();

router.route("/").get(pageController.getIndex);
router.route("/addPortfolio").get(pageController.getAddPortfolio);
router.route("/addPortfolio").post(upload.single("photo"), projectController.addPortfolio);

module.exports = router;
