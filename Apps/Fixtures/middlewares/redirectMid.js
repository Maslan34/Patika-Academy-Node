const redirectMid = (req,res,next) =>{
    if(gloabalUserSessionId)
        next();
    else{
        return res.redirect("/login")
    }
}

module.exports =redirectMid;