
const joi = require('joi')

const requestClientRoomChecker = joi.object({
    fname: joi.string().max(30).min(2),
    lname: joi.string().max(30).min(2),
    email: joi.string().email(),
    birthDate: joi.date(),
    phone: joi.number(),
    guest: joi.object(),
    roomNumber: joi.number() ,
    checkIn: joi.date(),
    checkOut: joi.date(),
    discount: joi.number(),
})

const requestEmployeeRegister = joi.object({
    fname: joi.string().max(30).min(2),
    lname: joi.string().max(30).min(2),
    email: joi.string().email(),
    username: joi.string(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: joi.string()
})

module.exports =  requestClientRoomChecker