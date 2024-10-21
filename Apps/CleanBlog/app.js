const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');


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
app.use(express.json());//Bu yazılmas ise şayet req.bodyden bilgileri alamayız
app.use(express.urlencoded({ extended: true }));//Bu yazılmas ise şayet req.bodyden bilgileri alamayız
// Middlewares

app.get('/', async (req, res) => {
  const blogs= await Blog.find();
  //console.log(blogs.length);
  res.render('index',{blogs})
});
app.get('/about', (req, res) => res.render('about'));
app.get('/add', (req, res) => res.render('add_post'));

const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
app.get('/test', (req, res) => {
  res.send(blog);
});

app.post('/sendBlog', (req, res) => {
  //console.log(req.body);
  Blog.create(req.body);
  res.redirect("/");
});

app.get('/posts/:id', async (req, res) => {
  const blog= await Blog.find({_id:req.params.id});
  res.render("post",{blog});
});

app.listen(port, () => {
  console.log(`Sunucu  ${port}'da dinleniyor.`);
});
