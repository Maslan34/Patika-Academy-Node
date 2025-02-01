const mongoose = require("mongoose");
const slugify = require("slugify");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug:{
    type:String,
    required:true,
  }
});

categorySchema.pre("validate", function (next) { 
    this.slug = slugify(this.name);
    next();
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
