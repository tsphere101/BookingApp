"use strict";
const express = require('express');
const Room = require('./DAO/roomDAO.js');
const router = express.Router();
const ReservationClass = require('./DAO/reservationDAO');
router.route('/add_room').post(Room.addRoom);
router.route('/findRoom').get(ReservationClass.findEmptyRoom);
router.route('/addBooking').post(ReservationClass.addBooking);
module.exports = router;
