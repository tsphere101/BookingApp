const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    "username": {type:String,default: null},
    "fname": {type:String,default: null},
    "lname": {type:String,default: null},
    "email": {type:String,default: null},
    "password": {type:String,default: null},
    "birthdate": {type:Date,default: null},
    "token": {type:Object}
    

})

module.exports = mongoose.model('Customers',customerSchema)