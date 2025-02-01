const Category = require('../models/Category');

const createCategory = async (req,res) => {
    try {
  
        await Category.create(req.body);
        res.redirect('/');
    
      } catch (err) {
        console.log("Error Occured:", err.message);
        res.status(400).render("errors/400", { pageName: "index" });
      }

}


const getCategories = async (req,res) => {
    try {
  
        await Category.create(req.body);
        res.status(201).redirect('/categories');
    
      } catch (err) {
        console.log("Error Occured:", err.message);
        res.status(400).render("errors/400", { pageName: "index" });
      }

}


module.exports = { createCategory };