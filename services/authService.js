const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')

// ВНИМАВАЙ ДАЛИ ЩЕ СЕ ЛОГВА С USERNAME ИЛИ EMAIL!!!!!!!!
// ВНИМАВАЙ КАКВО СЛАГАШ В COOKIE КАТО ГО ВРЪЩАШ!!

async function register({username, password}) { 
    username = username.toLowerCase();
    const repeatUser = await User.findOne({username})
    if(repeatUser){
        throw {message: 'Username already in use!'};
    }
    const user = new User({username, password}); 
    return await user.save();
}
async function login({username,password}){
    let user = await User.findOne({username})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Wrong password!'};
    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)

    return token
}

module.exports = {
    register,
    login
}