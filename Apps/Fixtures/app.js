const express = require('express')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const port = 3000

require('dotenv').config();
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
// CORS'u tüm rotalar için etkinleştir
app.use(cors());
app.set("view engine", "ejs"); // Ejs Engine Etkinleştirme
app.use(express.static(path.join(__dirname, "public"))); // Public Dosyasına ulaşma
const methodOverride = require('method-override'); // PUT ve Delete Islemeleri



// POST ISLEMLERI

app.use(express.urlencoded({ extended: true })); // POST ISLEMLERI
app.use(express.json()); // POST ISLEMLERI
app.use(methodOverride('_method')); // Method Override 

// POST ISLEMLERI

//Routes

  const pageRouter = require('./routes/pageRoute');
  const furnitureRouter = require('./routes/furnitureRoute');
  const categoriesRouter = require('./routes/categoriesRoute');

//Routes


// DB Connection

mongoose
  .connect('mongodb://127.0.0.1:27017/fixtures')
  .then(() => console.log('DB Connection Successfull'))
  .catch(() => console.log('DB Connection Failure '));
// DB Connection


app.use("/",pageRouter)
app.use("/furnitures",furnitureRouter)
app.use("/categories",categoriesRouter)




app.get('/', (req, res) => {
  res.render('index',{googleApiKey:googleApiKey})
})

app.listen(port, () => {
  console.log(`Fixtures app listening on port ${port}`)
})