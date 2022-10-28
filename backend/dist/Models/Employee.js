"use strict";
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    "username": { type: String, default: null },
    "fname": { type: String, default: null },
    "lname": { type: String, default: null },
    "email": { type: String, default: null },
    "password": { type: String, default: null },
    "department": { type: String, default: null },
    "token": { type: Object }
});
module.exports = mongoose.model('Employees', employeeSchema);
