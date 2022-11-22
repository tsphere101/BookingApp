
import {Request,Response} from 'express'
import {ARoomController} from './ARoomController'
const mongoose = require('mongoose')
const Rooms = require('../schema/roomSchema')

class ClientRoom{
    
    public static async findEmptyRoom(req:Request,res:Response){
        try {

            const emptyRoom = await Rooms.find({"roomName":"Superior Room"})

            res.json(emptyRoom)
        } catch (error) {
            console.log(error)
            res.send("API Error")
        }
    }

    public static async findEmptyRoomByDate(req:Request,res:Response){
        try {
            const { roomType , checkIn , checkOut , Guest} = req.body

            const filterRoom = await Rooms.find({
                // "_id":{$in: roomRequest.reservation_id}
                "roomName": roomType,
                "checkIn_date": {
                    $gte: new Date(checkIn) , 
                    $lt: new Date(checkOut)
                }
            })

            // const filterRoom = await Rooms.aggregate([
            //     {
            //         $match: { roomName: roomType}
            //     }
            // ])
            
            if(filterRoom.length > 0){
                console.log("True")
            }

            res.json(filterRoom)

        } catch (error) {
            console.log(error)
            res.send("API Error")
        }
        
    }
}

module.exports = ClientRoom