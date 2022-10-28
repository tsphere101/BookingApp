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
const RoomModel = require('../Models/Room');
const joi = require("joi");
class Room {
    static addRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.body)
                const { roomNumber, roomName, pricePerPerson, bed_type, bed_amoung } = req.body;
                const roomData = require('../data/room.json');
                const vaildateSchema = joi.array().items(// check item in array
                joi.object({
                    "roomName": joi.string().allow(null),
                    "roomNumber": joi.number().integer(),
                    "bedType": joi.string(),
                    "bedAmoung": joi.number().integer(),
                    "pricePerPerson": joi.number()
                }));
                yield vaildateSchema.validateAsync(roomData);
                for (let i in roomData) {
                    const roomAdded = yield new RoomModel({
                        'roomName': roomData[i].roomName,
                        'roomNumber': roomData[i].roomNumber,
                        'bed': {
                            'type': roomData[i].bedType,
                            'amoung': roomData[i].bedAmoung
                        },
                        'pricePerPerson': roomData[i].pricePerPerson,
                    });
                    // console.log(roomAdded)
                    roomAdded.save();
                }
                res.status(200).send("Added Room");
            }
            catch (e) {
                console.log(e);
                res.send(e);
            }
        });
    }
}
module.exports = Room;
