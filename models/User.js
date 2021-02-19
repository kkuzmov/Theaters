const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')

//check if needed!
// let ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;
// let EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
//check if needed! ^^^


const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: (value) =>{
        //         return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
        //      },
        //     message: (props)=>{
        //         return `${props.value} is invalid! Username should consist only of english letters and digits`
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value) =>{
        //         return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
        //      },
        //     message: (props)=>{
        //         return `Password must consist only of english letters and digits`
        //     }
        // }
    },
    likedPlays: []
})


userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt =>{
            return bcrypt.hash(this.password, salt);
        })
        .then(hash =>{
            this.password = hash;
            next()
        })
        .catch(err=>{
            console.log(err)
        })
    
    })

module.exports = mongoose.model('User', userSchema)