const express = require('express')
const Room = require('./DAO/roomDAO.js')
const router = express.Router()
const ReservationClass = require('./DAO/reservationDAO')
const EmployeeFactory = require('./Employee/Controller/EmployeeFactory.ts')
const EmployeeLogin = require('./Employee/Controller/EmployeeLogin')
// const addReservation = require('./Reservation/controller/reservation.Controller')
const ReservationController = require('./Reservation/controller/reservation.Controller')
const CRUDroom = require('./Room/controller/CRUDroom')
const ClientRoom = require('../src/Room/controller/clientRoom')
import { sendEmail } from './mail/clientReservationConfirm'



//Room----------------------------------------------------------------------------------------
router.route('/add_room').post(Room.addRoom)
// router.route('/findRoom').get(ReservationClass.findEmptyRoom)
router.route('/admin/add_room').post(CRUDroom.addRoom)
router.route('/findroom').get(ClientRoom.findEmptyRoomByDate)
router.route('/booking/find_available_room').get(ReservationController.findEmptyRoomByDate)


router.route('/booking').post(ReservationController.addReservation)
// router.route('/booking').get(ReservationController.findReservation)
router.route('/booking').post(ReservationController.addReservation)
// router.route('/employee').post(EmployeeFactory.buildEmployee)


//Admin--------------------------------------------------------------------
router.route('/admin/add_housekeepingtask')
router.route('/admin/employee/register').post(EmployeeFactory.buildEmployee)
router.route('/admin/employee/login').post(EmployeeLogin.login)


//Send Email
router.route('/admin/sendmail').post(sendEmail)

module.exports = router