const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Furniture = require('./Furniture');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  furnitureCount:Number,
  furnitures:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Furniture'
  },
  height: String,
  width: String,
  price: {
    type: String,
    required: true,
  },

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
