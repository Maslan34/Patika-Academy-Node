const User = require('../models/User');

module.exports  = ( roles ) => {

    return async (req, res, next) => {
        const user  =  await User.findOne({_id:req.session.userSession});
        console.log(user.role);
        console.log(roles)
        if(roles.includes(user.role))
            next();
        else
            res.status(401).json({message: "You are not allowed to access"});
    }
}