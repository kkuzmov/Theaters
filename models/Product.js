const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: /^https?/,
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