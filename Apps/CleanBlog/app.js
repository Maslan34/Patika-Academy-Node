const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // BURASI ÖNCELİKLE VİEWS KLASÖRÜNE BAKAR.

app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/add', (req, res) => res.render('add_post'));

const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
app.get('/test', (req, res) => {
  res.send(blog);
});

app.get('/test', (req, res) => {
  res.send(blog);
});

app.listen(port, () => {
  console.log(`Sunucu  ${port}'da dinleniyor.`);
});
