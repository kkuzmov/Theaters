module.exports = (req, res, next)=>{
    if(!req.user){
       return res.redirect('/auth/login')
    }
    next()
}

// ВНИМАВАЙ С PATHNAME НА REDIRECT!!!