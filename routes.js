// CHECK NAMES!!!

const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.get('*', (req, res)=>{
    res.status(404).send('<h1>Nothing here</h1>').end()
})

module.exports = router;

// виж дали е нужно да има 404 страница, вероятно не

// ВНИМАВАЙ С PATHNAMES!!