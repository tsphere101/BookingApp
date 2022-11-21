
import { Request, Response } from 'express'
const Rooms = require("../schema/roomSchema")

class CRUDroom{
    static async addRoom(req:Request, res:Response){
        try {
            // const roomData = require('../../data/room.json')
            const roomData = require('../../data/room.json')
            // console.log(roomData)

            for(let i=1 ; i < 4 ; i++){
                //21
                //SUP DEL BEH FAM
                const roomNum:string = "SUP" + String(i)
                const addRoom = new Rooms({
                    roomName: roomData[0].roomName,
                    roomNumber: roomNum,
                    bed_type: roomData[0].bed_type,
                    guest_amoung: roomData[0].bedAmoung,
                    pricePerPerson_no_breakfast: roomData[0].pricePerPerson.no_breakfast,
                    pricePerPerson_with_breakfast: roomData[0].pricePerPerson.breakfast,
                    reservation: []
                })

                await addRoom.save()
            }

            for(let i=1 ; i < 3 ; i++){
                //11
                const roomNum:string = "DEL" + String(i)
                const addRoom = new Rooms({
                    roomName: roomData[1].roomName,
                    roomNumber: roomNum,
                    bed_type: roomData[1].bed_type,
                    guest_amoung: roomData[1].bedAmoung,
                    pricePerPerson_no_breakfast: roomData[1].pricePerPerson.no_breakfast,
                    pricePerPerson_with_breakfast: roomData[1].pricePerPerson.breakfast,
                    reservation: []
                })

                await addRoom.save()
            }

            for(let i=1 ; i < 2 ; i++){
                //6
                const roomNum:string = "BEH" + String(i)
                const addRoom = new Rooms({
                    roomName: roomData[2].roomName,
                    roomNumber: roomNum,
                    bed_type: roomData[2].bed_type,
                    guest_amoung: roomData[2].bedAmoung,
                    pricePerPerson_no_breakfast: roomData[2].pricePerPerson.no_breakfast,
                    pricePerPerson_with_breakfast: roomData[2].pricePerPerson.breakfast,
                    reservation: []
                })

                await addRoom.save()
            }

            for(let i=1 ; i < 2 ; i++){
                //6
                const roomNum:string = "FAM" + String(i)
                const addRoom = new Rooms({
                    roomName: roomData[3].roomName,
                    roomNumber: roomNum,
                    bed_type: roomData[3].bed_type,
                    guest_amoung: roomData[3].bedAmoung,
                    pricePerPerson_no_breakfast: roomData[3].pricePerPerson.no_breakfast,
                    pricePerPerson_with_breakfast: roomData[3].pricePerPerson.breakfast,
                    reservation: []
                })

                await addRoom.save()
            }

            res.status(200).send("Done")
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }
}

module.exports = CRUDroom