"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const Booking = require('../Models/Booking.js');
const Room = require('../Models/Room.js');
const Reservation = require('../Models/Booking');
const requestClientRoomChecker = require('../checker.js');
class ReservationClass {
    //- customer fill the form for room option they want
    //      -> Backend query room that avaliable
    //      -> Request -> findEmptyRoom
    //- custom choose the room
    //      -> addBooking -> checkClientRequestRoom
    //  customer 
    static addBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const valideRoomRequest = yield requestClientRoomChecker.validateAsync(req.body);
                const { fname, lname, email, birthDate, phone, guest, roomNumber, checkIn, checkOut, discount, } = valideRoomRequest;
                const roomRequest = yield ReservationClass.checkClientRequestRoom(roomNumber, checkIn, checkOut);
                // roomRequest is object of model
                if (roomRequest === null) {
                    res.status(400).json({}).send("can't book this room on this date");
                }
                const addReservation = new Reservation({
                    "fname": fname,
                    "lname": lname,
                    "email": email,
                    "birthDate": birthDate,
                    "phone": phone,
                    "guest": guest,
                    "roomNumber": roomNumber,
                    "checkIn_date": checkIn,
                    "checkOut_date": checkOut,
                    "pricePerPerson": roomRequest.pricePerPerson,
                    "discout": discount,
                });
                const addedReservation = yield addReservation.save();
                roomRequest.reservation_id.push(addedReservation._id);
                roomRequest.save();
                res.send("Book room sucesss").status(200);
            }
            catch (error) {
                console.log(error);
                res.send("Error in Back");
            }
        });
    }
    static checkClientRequestRoom(roomNumber, checkIn, checkOut) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomRequest = yield Room.findOne({
                "roomNumber": Number(roomNumber)
            });
            // console.log(roomRequest)
            const BookedRoom = yield Booking.find({
                "_id": { $in: roomRequest.reservation_id },
                "checkIn_date": {
                    $gte: new Date(checkIn),
                    $lt: new Date(checkOut)
                }
            });
            if (BookedRoom.length == 0) {
                return roomRequest;
            }
            else {
                return null;
            }
        });
    }
    static findEmptyRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //request เป็นคุณสมบัติที่ลูกค้าต้องการ
            try {
                const { wantCheckInDate, wantCheckOutDate, guestAmoung, } = req.body;
                const BookedRoom = yield Booking.find({
                    "checkIn_date": {
                        $gte: new Date(wantCheckInDate),
                        $lt: new Date(wantCheckOutDate)
                    }
                });
                // ถ้า BookedRoom มี แสดงว่า ห้องนั้นไม่สามารถเข้าพักได้
                // ถ้า BookRoom ไม่มีอะไรเลย แสดงว่าทุกห้องสามารถเข้าพักได้
                const listOfBookedRoomNumber = BookedRoom.roomNumber; // must be list
                // console.log(listOfBookedRoomNumber)
                // console.log("----------------------")
                const emptyRoom = yield Room.find({
                    "roomNumber": { $nin: listOfBookedRoomNumber }
                });
                // console.log(emptyRoom)
                res.json(emptyRoom).status(200);
            }
            catch (error) {
                console.log(error);
                res.send("Error in back");
            }
        });
    }
}
module.exports = ReservationClass;
