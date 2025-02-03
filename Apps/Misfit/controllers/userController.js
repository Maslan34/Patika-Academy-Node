const User = require('../models/User');
const Category = require('../models/Category');

const goDashboardPage = async (req, res) => {
    const user = await User.findById(userSessionID)
  
    if(user.role === 'ADMIN')
      res.render('admin/dashboard',{ pageName: "dashboard" });
    else if (user.role === 'MEMBER')
      res.render('members/dashboard',{ pageName: "dashboard" });
    else {
      const categoriesFetched = await Category.find();
      res.render('trainers/dashboard',{ pageName: "dashboard",categories:categoriesFetched });
    }
    

  };
  
  
  module.exports = {
    goDashboardPage,
  };
  