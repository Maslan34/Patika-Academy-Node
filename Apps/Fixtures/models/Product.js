const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Furniture = require('./Furniture');
const slugify = require('slugify');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  furnitureCount:Number,
  furniture:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Furnitures'
  },
  height: String,
  width: String,
  price: {
    type: String,
    required: true,
  },
  slug:{
    type: String,
    unique: true,
  }

});


ProductSchema.pre('save', function (next) {
  //bu fonksiyon bir middleware yapısında db oluşturulmandan önce çağrılır ve slugfiy işlemi yapılır.
  // ardından next methodu ile diğer middleware geçilirek db kayıt işlemi sonlandırılır.

  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // -> farklı karakterleri görmez gelir.
  });
  next(); // -> bir sonraki middleware geçer
});


ProductSchema.pre ('validate', async function  (next) {
    //bu fonksiyon bir middleware yapısında db oluşturulmandan önce çağrılır ve slugfiy işlemi yapılır.
    // ardından next methodu ile diğer middleware geçilirek db kayıt işlemi sonlandırılır.
  
    const numberFurniture = await Furniture.find().countDocuments()
    this.furnitureCount = numberFurniture;
    next(); // -> bir sonraki middleware geçer
  }); 

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
