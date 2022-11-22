const express = require('express')
const Room = require('./DAO/roomDAO.js')
const router = express.Router()
const ReservationClass = require('./DAO/reservationDAO')
const EmployeeFactory = require('./Employee/Controller/EmployeeFactory.ts')
const EmployeeLogin = require('./Employee/Controller/EmployeeLogin')
// const addReservation = require('./Reservation/controller/reservation.Controller')
const ReservationController = require('./Reservation/controller/reservation.Controller')
const HousekeepingController = require('./housekeeping/controller/housekeepingController')
const CRUDroom = require('./Room/controller/CRUDroom')
const ClientRoom = require('../src/Room/controller/clientRoom')
const AdminReadReservation = require('./Reservation/controller/adminReadReservation.Controller')
const AdminEditReservation = require('./Reservation/controller/adminEditReservation.Controller')
import { sendEmail } from './mail/clientReservationConfirm'

const CustomerController = require('./Customer/controller/customerController')



//Room----------------------------------------------------------------------------------------
router.route('/add_room').post(Room.addRoom)
// router.route('/findRoom').get(ReservationClass.findEmptyRoom)
router.route('/admin/add_room').post(CRUDroom.addRoom)
router.route('/findroom').get(ClientRoom.findEmptyRoomByDate)
router.route('/booking/find_available_room').get(ReservationController.findEmptyRoomByDate)

//Client Reservation----------------------------------------------------------------------------------------
router.route('/booking').post(ReservationController.addReservation)
// router.route('/booking').get(ReservationController.findReservation)
router.route('/booking').post(ReservationController.addReservation)
router.route('/booking/full_room').get(ReservationController.findFullRoom)
// router.route('/employee').post(EmployeeFactory.buildEmployee)


//Admin--------------------------------------------------------------------
// 
// Admin - Housekeeping
router.route('/admin/housekeeping/tasks').get(HousekeepingController.getHousekeepingTasks)
router.route('/admin/housekeeping/task/add').post(HousekeepingController.addHousekeepingTask)
router.route('/admin/housekeeping/task/editComment').post(HousekeepingController.editHousekeepingTaskComment)
router.route('/admin/housekeeping/task/delete').post(HousekeepingController.deleteHousekeepingTask)
router.route('/admin/housekeeping/task/changeCondition').post(HousekeepingController.changeTaskCondition)
router.route('/admin/housekeeping/task/changeAssignedTo').post(HousekeepingController.changeAssignedTo)
router.route('/admin/housekeeping/task/changeDoNotDisturb').post(HousekeepingController.changeDoNotDisturb)
router.route('/admin/housekeeping/housekeepers').get(HousekeepingController.getHousekeepers)
router.route('/admin/housekeeping/tasks/filter').get(HousekeepingController.getHousekeepingTasksFilter)
// Admin - Employee
router.route('/admin/employee/register').post(EmployeeFactory.buildEmployee)
router.route('/admin/employee/login').post(EmployeeLogin.login)

//Admin reservation
router.route('/admin/reservation').get(AdminReadReservation.readReservation)
router.route('/admin/reservation').delete(AdminEditReservation.deleteReservation)

// Event Reservation
router.route('/reservation/event').post(ReservationController.addEventReservation)


//Admin guest(customer)
router.route('/admin/guest').post(CustomerController.addCustomer)
router.route('/admin/guest').get(CustomerController.customerList)
router.route('/admin/guest/reservation').get(CustomerController.customerReservation)
router.route('/admin/guest/country').get(CustomerController.customerCountry)

//Send Email
router.route('/admin/sendmail').post(sendEmail)

module.exports = router