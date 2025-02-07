const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')


// Global Variables

const port = 3000;
global.userSessionID = null;

// Global Variables

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
app.set("trust proxy", 1); // trust first proxy for sessions

// Configurations

// Middlewares

// Static Files

app.use(express.static(path.join(__dirname, "public")));

// Static Files

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Body Parser

  // Session

  app.use(
    session({
      secret: "Sensei",
      //resave: false, //deprecated
      //saveUninitialized: true, //deprecated
      //cookie: { secure: true }, // deprecated
      store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/misfit' })
    })
  );
  // Session

  // Method Override - PUT / DELETE REQUESTs

  app.use(methodOverride('_method'))

  // Method Override - PUT / DELETE REQUESTs

// Middlewares

// Routes

const pageRoute = require("./routes/pageRoute");
const traningRoute = require("./routes/traningRoute");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute");

// Routes
app.use("*", (req, res,next) => {
  userSessionID  = req.session.userSession;
  console.log("gloabal: "+userSessionID);
  //console.log("session: "+req.session.userSession);
  next();
});
app.use("/", pageRoute);
app.use("/trainings", traningRoute);
app.use("/categories", categoryRoute);
app.use("/users", authRoute);

app.listen(port, () => {
  console.log(`Misfit App Listening on Port ${port}`);
});
