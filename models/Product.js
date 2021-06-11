const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please pass a play title'],
        unique: [true, 'Play already exist in catalogue'],
    },
    description: {
        type: String,
        required: [true, 'Please pass a description'],
        maxlength: [50, 'Max length is 50 symbols']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please pass an Image Url'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true,
    },
    usersLiked: [],
    creator: {
        type: String,
    }
})


module.exports = mongoose.model('Product', productSchema);