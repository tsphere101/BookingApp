const express = require('express')
const Room = require('./DAO/roomDAO.js')
const router = express.Router()


router.route('/add_room').post(Room.addRoom)

module.exports = router