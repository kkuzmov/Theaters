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
        res.render('create-theater', {title: 'Create a new play'});
})
router.post('/create', (req, res) => {
    req.body.isPublic === 'on' ? req.body.isPublic = true : req.body.isPublic = false;
    req.body.creator = req.user._id
    productService.createProduct(req.body)
        .then(play =>{
            res.redirect('/');
        })

})
router.get('/:productId/details', (req, res)=>{
        productService.getOne(req.params.productId)
            .then(play =>{
                let isCreator = play.creator === req.user._id;
                res.render('theater-details', {title: 'Details', play, isCreator})
            })
})
router.get('/:productId/edit', (req, res)=>{
    productService.getOne(req.params.productId)
        .then(play =>{
            res.render('edit-theater', {title: 'Edit a play', play})
        })
})
router.post('/:productId/edit', (req, res)=>{
    
})
router.get('/:productId/buy', (req, res)=>{

})
router.get('/:productId/delete', (req, res)=>{
        productService.deleteOne(req.params.productId)
            .then(del =>{
                res.redirect('/')
            })
            .catch(err => console.log(err))
})



module.exports = router;