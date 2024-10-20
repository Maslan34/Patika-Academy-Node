const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String, 
  detail: String,
  dateCreated: {
    type:Date,
    default:Date.now()
  }
});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;