const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// 3rd Party npm

const mongoose = require("mongoose");

// 3rd Party npm

// DB Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/misfit")
  .then(() => console.log("DB Connection Successfull"))
  .catch((error) => console.log("DB Connection Failure ", error));

// DB Connection

// Configurations

app.set("view engine", "ejs");

// Configurations

// Middlewares

  // Static Files

  app.use(express.static(path.join(__dirname, "public")));

  // Static Files

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Body Parser

// Middlewares

// Routes

const pageRoute = require("./routes/pageRoute");
const traningsRoute = require("./routes/traningsRoute");

// Routes

app.use("/", pageRoute);
app.use("/trainings", traningsRoute);


app.listen(port, () => {
  console.log(`Misfit App Listening on Port ${port}`);
});
