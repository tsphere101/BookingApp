const mongoose = require("mongoose");
const RoomModel = require('../Models/Room')

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
            const roomAdded = await new RoomModel({
                'roomName':roomName,
                'roomNumber':roomNumber,
                'bed':{
                    'type':bed_type,
                    
                    'amoung':bed_amoung
                },
                'pricePerPerson':pricePerPerson,
            })
            roomAdded.save()
            
            res.status(200).send("Added Room")
        }catch(e){
            console.log(e)
            res.send(e)
        }
        
    }
}

module.exports = Room