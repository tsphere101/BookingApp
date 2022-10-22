const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://alohaadmin:iwanttorest@mern-rooms.khpipfz.mongodb.net/mern-rooms'
mongoose.connect(mongoURL,{useUnifiedTopology : true, useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB Connection Failed')
})
connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose