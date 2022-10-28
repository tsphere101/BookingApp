"use strict";
const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    birthDate: { type: Date },
    phone: { type: Number },
    guest: [{
            name: { type: String },
            gender: { type: String }
        }],
    roomNumber: { type: Number, require: true },
    checkIn_date: { type: Date },
    isCheckIn_date: { type: Date, default: null },
    checkOut_date: { type: Date },
    isCheckIn_date: { type: Date, default: null },
    pricePerPerson: { type: Number },
    discount: { type: Number },
    totalPrice: { type: Number },
    book_date: { type: Date }
});
module.exports = mongoose.model('Bookings', BookingSchema);
