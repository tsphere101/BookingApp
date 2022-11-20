import { model } from "mongoose"

import { Request } from 'express'
import { Reservation } from '../class/reservation'
import { Reservations } from '../schema/reservationSchema'
import { IReservationSchema } from '../schema/IReservationSchema'

const Rooms = require('../../Room/schema/roomSchema')
const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)

import { ReservationFactory } from './ReservationFactory'

export class RoomReservationBuilder extends ReservationFactory{
    // private roomNumber: string

    // constructor(
    //     prefix: string,
    //     fname: string,
    //     lname: string,
    //     email: string,
    //     phone: string,
    //     address: string,
    //     checkIn_date: Date,
    //     checkOut_date: Date,
    //     roomNumber: string
    // ){
    //     super(prefix,fname,lname,email,phone,address,checkIn_date,checkOut_date)
    //     this.roomNumber = roomNumber

    // }

    async makeReservation(req:Request){
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
    
    
            //2. find type of room that fit number of guest
            //3. find empty room (big logic here)
            
            const roomIDforAdd = await RoomReservationBuilder.findRoomAvaliableInDateReturnID(new Date(checkIn_date),new Date(checkOut_date),roomType)
            console.log(roomIDforAdd)
            console.log("cart")
            
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
    
            // const addReservation = new ReservationsModel({
            //     prefix: prefix,
            //     fname: fname,
            //     lname: lname,
            //     email: email,
            //     phone: phone,
            //     address: address,
            //     addition: addition,
            //     guest: {
            //         adult: guest.adult,
            //         child: guest.child
            //     },
            //     roomNumber: roomForAdd.roomNumber,
            //     checkIn_date: checkIn_date,
            //     isCheckIn: false,
            //     checkOut_date: checkOut_date,
            //     isCheckOut: false,
            //     pricePerPerson: roomPrice,
            //     discount: discount,
            //     totalPrice: totalPrice,
            //     book_date: new Date()
            // })
    
            const roomReservationObject = new Reservation(
                prefix,fname,lname,email,phone,address,addition,
                checkIn_date,
                checkOut_date,
                discount,
                breakfast,
                roomType,
                guest.adult,
                guest.child,
                roomIDforAdd.roomNumber,
                roomPrice,
                totalPrice
            )
            
            const addedRoomReservation = await roomReservationObject.saveToDB()
            
            
            await roomForAdd.reservation.push(addedRoomReservation)
            roomForAdd.save()
    
            if(addedRoomReservation == null){
                return null
            }else{
                return addedRoomReservation.toJSON()
            }
            
        } catch (error) {
            console.log(error)
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