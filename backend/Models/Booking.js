const { number } = require('joi');
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    fname: {type:String},
    lname: {type:String},
    email: {type:String},
    birthDate: {type:Date},
    phone: {type:number},
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
    discout: {type:Number},
    totalPrice:{type:Number},
    book_date: {type:Date}
    // payment: {

    // }
})

module.exports = mongoose.model('Bookings',BookingSchema)