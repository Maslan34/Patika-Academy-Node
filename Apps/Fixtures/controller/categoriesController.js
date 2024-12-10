
const Category = require('../models/Product')

const getAllCategories = async (req,res) =>{

    const getAllCategories = await Category.find()
    res.render("furnitures",{categories:getAllCategories});

}

const addNewCategories = async (req,res) =>{
    //console.log("here")


  console.log(req.body);
    const category = await Category.create(req.body)
    res.json(category);

}

const getCategory = async (req,res) =>{
 
    const categoryFetched = await Category.findOne({_id:req.params.id})
    res.render("furnitures-single",{category:categoryFetched});

}

  module.exports = {
    getAllCategories,
    addNewCategories,
    getCategory
  };
  