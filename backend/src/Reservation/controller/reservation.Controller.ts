import {Request,Response} from "express"
import { model } from "mongoose"
// import {Reservations} from '../schema/reservationSchema'
// const Reservations = require('../schema/reservationSchema')
import { Reservations } from '../schema/reservationSchema'
import { IReservation } from '../class/IReservation'
import { IReservationSchema } from '../schema/IReservationSchema'
const Rooms = require('../../Room/schema/roomSchema')

const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)

class ReservationController{

    static async addReservation(req:Request,res:Response){
        try {
            const { 
                prefix,fname,lname,email,phone,address,addition,
                guest,
                checkIn_date,
                checkOut_date,
                discount,
                breakfast,
                roomType
            } = req.body
            
            /*
            0. check cilent request
            1. check guest
            2. find type of room that fit request 
            3. find empty room (big logic here)
            4. add reservation in Reservation table
            5. add reservation in Room table
            */

            //1. Check guest

            // const list = []
            // if (guest.length > 0){
            //     for(let i of guest){
            //         list.push({
            //             "name": i.name,
            //             "gender": i.gender
            //         })
            //     }
                
            // }

            //2. find type of room that fit number of guest
            // const fitRoomName = ReservationController.filterRoomName(guest)


            //3. find empty room (big logic here)

            // const roomfiltedName = await Rooms.find({
            //     // "roomName": {$in:fitRoomName},
            //     "roomName": roomType
            // })

            
            const roomIDforAdd = await ReservationController.findRoomAvaliableInDateReturnID(checkIn_date,checkOut_date,roomType)
            console.log(roomIDforAdd)
            // for(let eachRoom of roomfiltedName){
            //     // i.reservation.
            //     console.log(eachRoom.reservation)
            //     if(eachRoom.reservation.length <= 0){
            //         // Add reservation
            //         roomIDforAdd = eachRoom._id
            //         break
            //     }else{
            //         console.log(eachRoom)
            //         for(let eachReser of eachRoom.reservation){
            //             //เช็คแต่ละ reservation 
            //             if((checkIn_date <= eachReser.reservation.checkIn_date && checkOut_date <= eachReser.reservation.checkIn_date) ||
            //                 (checkIn_date >= eachReser.reservation.checkOut_date && checkOut_date >= eachReser.reservation.checkOut_date) ){
            //                     roomIDforAdd = eachRoom._id
            //                     break
            //             }
                        
            //         }
            //         if(roomIDforAdd == null){
            //             res.send("Can't find empty room")
            //         }else{
            //             break
            //         }
            //     }
            // }

            //4. add reservation in Reservation table
            const roomForAdd = await Rooms.findOne({ _id: roomIDforAdd })

            let roomPrice = 0
            if(breakfast == true){
                roomPrice = roomForAdd.pricePerPerson_with_breakfast
            }else{
                roomPrice = roomForAdd.pricePerPerson_no_breakfast
            }
            
            const guestNum = guest.adult + guest.child
            const totalPrice = (Number(roomPrice)*guestNum) - discount

            const addReservation = new ReservationsModel({
                prefix: prefix,
                fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                address: address,
                addition: addition,
                guest: {
                    adult: guest.adult,
                    child: guest.child
                },
                roomNumber: roomForAdd.roomNumber,
                checkIn_date: checkIn_date,
                isCheckIn: false,
                checkOut_date: checkOut_date,
                isCheckOut: false,
                pricePerPerson: roomPrice,
                discount: discount,
                totalPrice: totalPrice,
                book_date: new Date()
            })

            const addedReservation = await addReservation.save()
            console.log(addedReservation)
            await roomForAdd.reservation.push(addedReservation)
            roomForAdd.save()

            res.send("Reservation Added")


        } catch (error) {
            console.log(error)
            res.send("API error")
        }
        
    }



    static async findEmptyRoomByDate(req:Request,res:Response){
        try {
            const { checkIn , checkOut , guest} = req.body

            const nameListRoomTypeFitGuest = ReservationController.filterRoomName(guest)
            let okRoomType = []

            for(let i of nameListRoomTypeFitGuest){
                const returnRoomID = await ReservationController.findRoomAvaliableInDateReturnID(checkIn , checkOut,i)
                if(returnRoomID != null){
                    okRoomType.push(i)
                }
            }
            const avaliableRoom = {
                "availableRoom": okRoomType
            }

            res.json(avaliableRoom)

        } catch (error) {
            console.log(error)
            res.send("API Error")
        }
        
    }

    static async findRoomAvaliableInDateReturnID(checkIn:Date , checkOut:Date, roomType:string){
        const roomFilterType = await Rooms.find({"roomName":roomType})

        console.log(roomFilterType)
        let roomIDForAdd = null
        let isRoomAvaliable = true
        for(let eachRoom of roomFilterType){
            isRoomAvaliable = true
            for(let eachReser of eachRoom.reservation){
                if(!((checkIn < eachReser.checkIn_date && checkOut <= eachReser.checkIn_date) ||
                    (checkIn >= eachReser.checkOut_date && checkOut > eachReser.checkOut_date)) ){
                        isRoomAvaliable = false
                        break
                }
                
            }
            if(isRoomAvaliable == true){
                roomIDForAdd = eachRoom._id
                break
            }
        }

        return roomIDForAdd

    }

    static filterRoomName(guest:number): string[]{
        let filtedRoomName: any[] = []
        if(guest <= 2){
            //filter: "Superior Room" "Deluxe Room" "Beach House" "Family Premium"
            filtedRoomName = ["Superior Room", "Deluxe Room", "Beach House", "Family Premium"]
        }else if(guest >2 && guest < 4){
            //filter: "Superior Room" "Deluxe Room" "Family Premium"
            filtedRoomName = ["Superior Room", "Deluxe Room", "Family Premium"]
        }else if(guest == 4){
            //filter: "Family Premium"
            filtedRoomName = ["Family Premium"]
        }
        return filtedRoomName
    }


    
}

module.exports = ReservationController
