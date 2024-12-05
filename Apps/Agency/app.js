const express = require("express"); // Express Server
const app = express();
const path = require("path");
const port = 3000;

app.set("view engine", "ejs"); // Ejs Engine 'ı aktif hale getirme

//console.log((path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, "public"))); // Public Dosyasına ulaşma

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Agency App Listening On Port ${port}`);
});
