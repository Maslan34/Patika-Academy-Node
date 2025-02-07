const Category = require('../models/Category');
const User = require('../models/User');

const createCategory = async (req,res) => {
    try {
  
        await Category.create(req.body);
        res.redirect('/users/dashboard');
    
      } catch (err) {
        console.log("Error Occured:", err.message);
        res.status(400).render("errors/400", { pageName: "index" });
      }

}

const deleteCategory = async (req,res) => {
  try {

    const category = await Category.findOneAndDelete({slug:req.params.slug});
    const usersFetched = await User.find();
    const categoriesFetched = await Category.find();
    res.render("admin/dashboard", { pageName: "dashboard",users:usersFetched,categories:categoriesFetched });
  
    } catch (err) {
      console.log("Error Occured:", err.message);
      res.status(400).render("errors/400", { pageName: "index" });
    }

}

const updateCategory = async (req,res) => {
  try {

    const filter = {slug:req.params.slug};
    const update = {
      ...req.body
    };
    const category = await Category.findOneAndUpdate(filter,update,{new:true});
    const usersFetched = await User.find();
    const categoriesFetched = await Category.find();
    res.render("admin/dashboard", { pageName: "dashboard",users:usersFetched,categories:categoriesFetched });
  
    } catch (err) {
      console.log("Error Occured:", err.message);
      res.status(400).render("errors/400", { pageName: "index" });
    }

}






module.exports = { createCategory,deleteCategory,updateCategory };