const express = require("express"); // Express Server
const app = express();
const path = require("path");
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const port = 3000;

app.set("view engine", "ejs"); // Ejs Engine 'ı aktif hale getirme

//console.log((path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, "public"))); // Public Dosyasına ulaşma


// POST ISLEMLERI

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(fileUpload()); 

// POST ISLEMLERI


//Routes

    const pageRouter = require('./routes/pageRouter')

//Routes



// MongoDB

mongoose
  .connect('mongodb://localhost/agency', {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

  // MongoDB


app.use('/', pageRouter);



app.listen(port, () => {
  console.log(`Agency App Listening On Port ${port}`);
});
