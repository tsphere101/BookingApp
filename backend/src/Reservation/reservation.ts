import { IGuest } from './schema/IGuest'
import { model } from "mongoose"
import { IReservation } from './class/IReservation'
import {Reservations} from "./schema/reservationSchema"
import { IReservationSchema } from './schema/IReservationSchema'


class Reservation implements IReservation{
    private prefix: string
    private fname: string
    private lname: string
    private email: string
    private phone: string
    private address: string
    private addition:string
    private guest: {
        adult: number
        child: number
    }
    private checkInDate: Date
    private checkOutDate: Date
    private discount: number
    private breakfast: boolean
    private roomType: string


    constructor(prefix:string,fname:string,lname:string,email:string,phone:string,address:string,addition:string,guest:IGuest,checkInDate:Date,checkOutDate:Date,discount:number,breakfast:boolean,roomType:string){
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.address = address
        this.addition = addition
        this.guest = guest
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
        this.discount = discount
        this.breakfast = breakfast
        this.roomType = roomType
    }

    async saveToDB(roomNumber: string,isCheckIn:boolean, isCheckOut:boolean, roomPrice:number, totalPrice:number){
        try {
            const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)
            const reservationAdd = new ReservationsModel({
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                phone: this.phone,
                guest: this.guest,
                roomNumber: roomNumber,
                checkIn_date: this.checkInDate,
                isCheckIn: isCheckIn,
                checkOut_date: this.checkOutDate,
                isCheckOut: isCheckOut,
                pricePerPerson: roomPrice,
                discount: this.discount,
                totalPrice: totalPrice,
                book_date: new Date()
            })

            const addedReservation = await reservationAdd.save()
            return addedReservation
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // static async findRoomByDate(checkInDate:Date,checkOutDate:Date,guest:number){
    //     try {
    //         const 
    //     } catch (error) {
    //         return null
    //     }
    // }

    
    

}