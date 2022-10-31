const express = require('express')
const Room = require('./DAO/roomDAO.js')
const router = express.Router()
const ReservationClass = require('./DAO/reservationDAO')
const EmployeeFactory = require('./Employee/Controller/EmployeeFactory.ts')
 

router.route('/add_room').post(Room.addRoom)
router.route('/findRoom').get(ReservationClass.findEmptyRoom)
router.route('/addBooking').post(ReservationClass.addBooking)
router.route('/employee').post(EmployeeFactory.buildEmployee)

module.exports = router