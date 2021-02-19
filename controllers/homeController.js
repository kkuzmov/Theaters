const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    productService.getAll()
        .then(plays =>{
            if(req.user){
                plays = plays.sort((a, b)=> b.createdAt - a.createdAt);
                res.render('user-home', {title: 'Home', plays})
            }else{
                plays = plays.slice(0, 3).sort((a,b)=> b.usersLiked.length - a.usersLiked.length);
                res.render('guest-home', {title: 'Guest-Home', plays})
            }
        })
    
})
router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

module.exports = router

