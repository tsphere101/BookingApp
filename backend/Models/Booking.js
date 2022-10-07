const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    fname: {type:String},
    lname: {type:String},
    email: {type:String},
    birthDate: {type:Date},
    guest: [{
        name: {type:String},
        gender: {type:String}
    }],
    roomNumber: {tpye:mongoose.Types.ObjectId,require:true},
    checkIn_date:{type:Date},
    isCheckIn_date: {type:Date,default: null},
    checkOut_date:{type:Date},
    isCheckIn_date: {type:Date,default: null},
    pricePerPerson: {type:Number},
    totalPrice:{type:Number},
    book_date: {tpye:Date}
    // payment: {

    // }
})

module.exports = mongoose.model('Bookings',BookingSchema)