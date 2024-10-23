const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

const methodOverride = require('method-override'); //POST üzerinden put ve delete gönderme

// Controllers
const pageController = require('./controllers/pageController');
const blogController = require('./controllers/blogController');
// Controllers

// DB Connection
mongoose
  .connect('mongodb://localhost/cleanblog-test-db', {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));
const port = 3000;

// Middlewares

app.use(express.static(path.join(__dirname, 'public'))); //Dosyaların public tarafından gözükebilmesi için
app.set('view engine', 'ejs'); // BURASI ÖNCELİKLE VİEWS KLASÖRÜNE BAKAR.
app.use(express.json()); //Bu yazılmas ise şayet req.bodyden bilgileri alamayız
app.use(express.urlencoded({ extended: true })); //Bu yazılmas ise şayet req.bodyden bilgileri alamayız
app.use(methodOverride('_method')); //POST üzerinden put ve delete gönderme
// Middlewares

app.get('/', pageController.goIndex);
app.get('/about', pageController.goAbout);
app.get('/add', pageController.goAdd);

const blog = { id: 1, title: 'Blog title', description: 'Blog description' };

app.get('/test', (req, res) => {
  res.send(blog);
});

app.post('/sendBlog', blogController.sendBlog);

app.get('/posts/:id', blogController.goBlogSinglePage);

app.put('/update/:id', blogController.updateBlog);

app.delete('/delete/:id', blogController.deleteBlog);

app.listen(port, () => {
  console.log(`Sunucu  ${port}'da dinleniyor.`);
});
