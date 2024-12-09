const express = require('express')
const path = require('path')
const cors = require('cors');
const app = express()
const port = 3000

require('dotenv').config();
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
// CORS'u tüm rotalar için etkinleştir
app.use(cors());
app.set("view engine", "ejs"); // Ejs Engine Etkinleştirme
app.use(express.static(path.join(__dirname, "public"))); // Public Dosyasına ulaşma

app.get('/', (req, res) => {
  res.render('index',{googleApiKey:googleApiKey})
})

app.listen(port, () => {
  console.log(`Fixtures app listening on port ${port}`)
})