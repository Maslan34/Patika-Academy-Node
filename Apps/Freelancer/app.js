const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join("public")));
app.set("view engine", "ejs");
const port = 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`The application has started on ${port}.`);
});
