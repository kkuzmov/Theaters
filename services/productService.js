const Product = require('../models/Product');

async function getAll(query){
    let products = await Product.find({}).lean()

    // само ако има search 
    // if(query.search){
    //     products = products.filter(x => x.name.toLowerCase().includes(query.search))
    // }
    // if(query.from){
    //     products = products.filter(x => Number(x.level) >= query.from);
    // }
    // if(query.to){
    //     products = products.filter(x => Number(x.level) <= query.to);
    // }
    return products;
}
async function getOne(id){
    return Product.findById(id).lean();
}
function createProduct(data){
       let product = new Product({...data}); 
       return product.save()
}
function updateOne(productId, productData){
       return Product.updateOne({_id: productId}, productData)
}
function deleteOne(productId){
     return Product.deleteOne({_id: productId})
}
module.exports = {
    getAll,
    getOne,
    createProduct,
    updateOne,
    deleteOne
}