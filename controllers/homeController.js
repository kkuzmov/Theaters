const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    if(req.user){
        res.render('user-home', {title: 'Home'})
    }else{
        res.render('guest-home', {title: 'Guest-Home'})
    }
})
router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

module.exports = router

