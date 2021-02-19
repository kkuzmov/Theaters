const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    console.log('loaded main and home views')
    res.render('home', {title: 'Home'})
})
router.get('/about', (req, res) => {
    res.render('about', {title: 'About us'});
})

module.exports = router

