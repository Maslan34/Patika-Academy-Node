const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }
});

const Furniture = mongoose.model("Furnitures", FurnitureSchema);

module.exports = Furniture;
