const Blog = require('../models/Blog');

const sendBlog = (req, res) => {
  //console.log(req.body);
  Blog.create(req.body);
  res.redirect('/');
};

const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

const updateBlog = async (req, res) => {
  const titleFetched = req.body.title;
  const detailFetched = req.body.detail;
  await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title: titleFetched, detail: detailFetched } },
    { new: true },
  );

  res.redirect('/');
};

const goBlogSinglePage = async (req, res) => {
  const blog = await Blog.find({ _id: req.params.id });
  res.render('post', { blog });
};
module.exports = {
  sendBlog,
  deleteBlog,
  updateBlog,
  goBlogSinglePage,
};
