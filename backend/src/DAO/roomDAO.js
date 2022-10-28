const mongoose = require("mongoose");
const RoomModel = require('../Models/Room')
const joi = require("joi")

class Room{
    static async addRoom(req,res){
        try{
            // console.log(req.body)
            const {roomNumber,
            roomName,
            pricePerPerson,
            bed_type,
            bed_amoung
            } = req.body
            
            const roomData = require('../data/room.json')

            const vaildateSchema = joi.array().items( // check item in array
                joi.object({
                    "roomName": joi.string().allow(null),
                    "roomNumber": joi.number().integer(),
                    "bedType": joi.string(),
                    "bedAmoung": joi.number().integer(),
                    "pricePerPerson": joi.number()
                })
            )
            await vaildateSchema.validateAsync(roomData)

            for(let i in roomData){

                const roomAdded = await new RoomModel({
                    'roomName':roomData[i].roomName,
                    'roomNumber':roomData[i].roomNumber,
                    'bed':{
                        'type': roomData[i].bedType,
                        'amoung':roomData[i].bedAmoung
                    },
                    'pricePerPerson': roomData[i].pricePerPerson,
                })
                // console.log(roomAdded)
                roomAdded.save()
            }
            
            res.status(200).send("Added Room")
        }catch(e){
            console.log(e)
            res.send(e)
        }
        
    }
}

module.exports = Room