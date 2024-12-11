const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

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
  },
  slug:{
    type: String,
    unique: true,
  }
});

FurnitureSchema.pre('save', function (next) {
  //bu fonksiyon bir middleware yapısında db oluşturulmandan önce çağrılır ve slugfiy işlemi yapılır.
  // ardından next methodu ile diğer middleware geçilirek db kayıt işlemi sonlandırılır.

  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // -> farklı karakterleri görmez gelir.
  });
  next(); // -> bir sonraki middleware geçer
});

const Furniture = mongoose.model("Furnitures", FurnitureSchema);

module.exports = Furniture;
