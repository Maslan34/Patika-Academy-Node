module.exports = (req,res,next) => {
    if(req.session.userSession)
        res.redirect("/")
    else
        next();
}