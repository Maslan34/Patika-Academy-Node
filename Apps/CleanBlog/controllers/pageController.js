const Blog = require('../models/Blog');

const goIndex = async (req, res) => {
  const blogs = await Blog.find();
  //console.log(blogs.length);
  res.render('index', { blogs });
};
const goAbout = (req, res) => res.render('about');

const goAdd = (req, res) => res.render('add_post');
module.exports = {
  goIndex,
  goAbout,
  goAdd,
};
