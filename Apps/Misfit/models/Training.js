const mongoose = require("mongoose");
const slugify = require("slugify");
const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug:{
    type:String,
    required:true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"categories",
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});


trainingSchema.pre('validate', function(next) {
  this.slug = slugify(this.name);
  next();
})
const Training = mongoose.model("trainings", trainingSchema);

module.exports = Training;
