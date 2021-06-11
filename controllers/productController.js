const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


router.get('/', (req, res) => {
    res.redirect('/');
})
router.get('/create', isAuthenticated, (req, res) => {
        res.render('create-theater', {title: 'Create a new play'});
})
router.post('/create', isAuthenticated, (req, res) => {
    req.body.isPublic === 'on' ? req.body.isPublic = true : req.body.isPublic = false;
    req.body.creator = req.user._id
    productService.createProduct(req.body)
        .then(play =>{
            res.redirect('/');
        })
        .catch(error=>{
            res.status(405).render('create-theater', {error})
        })

})
router.get('/:productId/details', isAuthenticated,(req, res)=>{
        productService.getOne(req.params.productId)
            .then(play =>{
                let isCreator = play.creator === req.user._id;
                let isLikedByThisUser = play.usersLiked.includes(req.user._id);

                res.render('theater-details', {title: 'Details', play, isCreator, isLikedByThisUser})
            })
            .catch(err =>{
            res.status(404).render('user-home', {error: {message: err}})
            })
})
router.get('/:productId/edit', isAuthenticated,(req, res)=>{
    productService.getOne(req.params.productId)
        .then(play =>{
            res.render('edit-theater', {title: 'Edit a play', play})
        })
        .catch(err =>{
            res.status(404).render('user-home', {error: {message: err}})
        })
})
router.post('/:productId/edit', isAuthenticated,(req, res)=>{
        let dataToSend = req.body;
        console.log(dataToSend);
        dataToSend.isPublic === 'on' ? dataToSend.isPublic = true : dataToSend.isPublic = false;
        productService.updateOne(req.params.productId, dataToSend)
            .then(updated =>{
                res.redirect(`/products/${req.params.productId}/details`);
            })
            .catch(err =>{
                res.status(404).render('user-home', {error: {message: err}})
            })
})
router.get('/:productId/delete', isAuthenticated, (req, res)=>{
        productService.deleteOne(req.params.productId)
            .then(del =>{
                res.redirect('/')
            })
            .catch(err => {
                res.render(`theater-details`, {error: {message: err}});
            })
})
router.get('/:productId/like', isAuthenticated,(req, res)=>{
    productService.getOne(req.params.productId)
        .then(play =>{
            play.usersLiked.push(req.user._id)
            productService.updateOne(req.params.productId, play)
                .then(response =>{
                    res.redirect(`/products/${req.params.productId}/details`);
                })
                .catch(err => {console.log(err)})
        })
        .catch(err => console.log(err))
})
router.get('/sort-by-date', (req, res)=>{
    productService.getAll()
        .then(plays =>{
                plays = plays.filter(play => play.isPublic === true).sort((a, b)=> a.createdAt - b.createdAt);
                res.render('user-home', {title: 'Home', plays})
        })
        .catch(err =>{
            res.render('user-home', {error: {message: err}}).redirect('/')
        })
})
router.get('/sort-by-likes', (req, res)=>{
    productService.getAll()
        .then(plays =>{
            plays = plays.sort((a,b)=> b.usersLiked.length - a.usersLiked.length).slice(0, 1);
            res.render('user-home', {title: 'Guest-Home', plays})
        })
        .catch(err =>{
            res.render('user-home', {error: {message: err}}).redirect('/')
        })
})



module.exports = router;