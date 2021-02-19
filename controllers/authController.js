const { Router } = require('express');
const authService = require('../services/authService');
const router = Router();
const { COOKIE_NAME } = require('../config/config');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

//ВТОРИЯТ ПАРАМЕТЪР НА .GET Е MIDDLEWARE - ВНИМАВАЙ ДАЛИ ГО ИЗПОЛЗВАШ!

router.get('/login',(req, res) => {
    res.render('login', {title: 'Login'});
})
router.post('/login',async (req, res)=>{
    const {username, password} = req.body;

    try {
        let token = await authService.login({username, password})

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/products')
    } catch (error) {
        res.status(404).render('login', {error});
    }
})
router.get('/register',(req, res) => {
    res.render('register', {title: 'Register'})
})
router.post('/register',async (req, res) => {
    const {username, password, repeatPassword } = req.body;

    // AKO E НУЖНО ВЕДНАГА ДА Е ЛОГНАТ, ПРОВЕРИ В BOOKING_UNI - ТАМ Е НАСТРОЕНО

    if(password !== repeatPassword){
        res.status(401).render('register', {message: 'Passwords do not match!'});
        return;
    }
    try {
        let user = await authService.register({username, password});
        res.redirect('/auth/login')
    } catch (error) {
        res.status(401).render('register', {error})
        return;
    }
})
router.get('/logout', (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/')
})
module.exports = router;