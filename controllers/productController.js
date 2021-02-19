const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('../controllers/helpers/productHelper'); // валидатор за продукт - провери дали е нужен

// ВНИМАВАЙ С PATHS КЪМ VIEWS 

router.get('/', (req, res) => {
    res.redirect('/');
})
router.get('/create', (req, res) => {
        res.render('create', {title: 'Create a new product'});
})
router.post('/create', (req, res) => {


})
router.get('/:productId/details', (req, res)=>{
    
})
router.get('/:productId/edit', (req, res)=>{
    
})
router.post('/:productId/edit', (req, res)=>{
    
})
router.get('/:productId/buy', (req, res)=>{

})
router.get('/:productId/delete', (req, res)=>{
    
})



module.exports = router;