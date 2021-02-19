const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(plays =>{
            if(req.user){
                plays = plays.filter(play => play.isPublic === true).sort((a, b)=> b.createdAt - a.createdAt);
                res.render('user-home', {title: 'Home', plays})
            }else{
                plays = plays.slice(0, 3).sort((a,b)=> b.usersLiked.length - a.usersLiked.length);
                res.render('guest-home', {title: 'Guest-Home', plays})
            }
        })
    
})

module.exports = router

