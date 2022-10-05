const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {tpye:mongoose.Types.ObjectId,require:true},
    roomId: {tpye:mongoose.Types.ObjectId,require:true},
    guests_number: {type:Number,default:null},
    checkIn_date:{type:Date},
    checkOut_date:{type:Date},
    totalPrice:{type:Number},
})

module.exports = mongoose.model('Bookings',BookingSchema)