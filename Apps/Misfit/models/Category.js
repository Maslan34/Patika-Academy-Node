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

// The part where the slug is updated again after the category is updated.
categorySchema.post("findOneAndUpdate", function (doc) {
  if (doc.name) {
    doc.slug = slugify(doc.name);
    doc.save();  
  }
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
