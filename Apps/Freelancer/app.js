const express = require("express");
const app = express();
const path = require("path");

// 3rd Party npm

  const mongoose = require("mongoose");
  const methodOverride = require('method-override')

// 3rd Party npm


// DB Connection

mongoose
  .connect('mongodb://127.0.0.1:27017/freelancer')
  .then(() => console.log('DB Connection Successfull'))
  .catch(() => console.log('DB Connection Failure '));
// DB Connection


const pageRouter = require("./routes/pageRouter");
const projectRouter = require("./routes/projectRouter");


// UTILITY MIDDLEWARES

  app.use(express.static(path.join(__dirname,"public"))); // STATIC FILES
  app.set("view engine", "ejs");  // VIEW ENGINE

  // GETTING POST DATA
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));  

  // METHOD OVERRIDE
  app.use(methodOverride('_method'))

// UTILITY MIDDLEWARES



const port = 3000;


// ROUTES

app.use("/",pageRouter);
app.use("/project",projectRouter);

// ROUTES


app.listen(port, () => {
  console.log(`The application has started on ${port}.`);
});
