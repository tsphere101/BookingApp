import { model,Types } from "mongoose"
import { IReservation } from './IReservation'


import { Request,Response} from 'express'

const Rooms = require('../../Room/schema/roomSchema')
const ReservationsModel = require('../schema/reservationSchema')

export class Reservation implements IReservation{
    private prefix: string
    private fname: string
    private lname: string
    private email: string
    private phone: string
    private address: string
    private addition:string
    private discount: number
    private breakfast: boolean
    private roomType: string
    private adult: number
    private child: number
    private roomNumber: string
    private checkIn_date: Date
    private checkOut_date: Date
    private roomPrice: number
    private totalPrice: number


    constructor(
        prefix:string,fname:string,lname:string,email:string,phone:string,address:string,addition:string,checkIn_date:Date,checkOut_date:Date,discount:number,breakfast:boolean,roomType:string,
        adult: number,child: number,roomNumber: string,roomPrice: number,totalPrice: number
        ){
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.address = address
        this.addition = addition
        this.checkIn_date = checkIn_date
        this.checkOut_date = checkOut_date
        this.discount = discount
        this.breakfast = breakfast
        this.roomType = roomType
        this.adult = adult
        this.child = child
        this.roomNumber = roomNumber
        this.roomPrice = roomPrice
        this.totalPrice = totalPrice
    }

    async saveToDB(){
        try {
             
            const reservationAdd = new ReservationsModel({
                prefix: this.prefix,
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                phone: this.phone,
                address: this.address,
                addition: this.addition,
                guest: {
                    adult: this.adult,
                    child: this.child
                },
                roomNumber: this.roomNumber,
                checkIn_date: this.checkIn_date,
                isCheckIn: false,
                checkOut_date: this.checkOut_date,
                isCheckOut: false,
                pricePerPerson: this.roomPrice,
                discount: this.discount,
                totalPrice: this.totalPrice,
                book_date: new Date()
            })

            const addedReservation = await reservationAdd.save()
            return addedReservation
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async editReservation(req:Request,res:Response){
        // try {
        //     const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)
        //     /*
        //     {
        //         "id": sasdasd,
        //         "edit_data":{
        //             "fname":
        //         }
        //     }
        //     */
        //     const {id,edit_data} = req.body
        //     const foundReservation = await ReservationsModel.findOne(
        //         {"_id":new Types.ObjectId(id)},
        //         {
        //             "fname":fname,
        //             "lname":lname,
        //             "email"
        //         }
        //     )
        //     const foundRoom = await Rooms.findOne({"reservation":{ $elemMatch: {"_id":new Types.ObjectId(id)}}})
        //     await foundReservation?.save()


        // } catch (error) {
        //     console.log(error)
        //     res.send("API error")
        // }
    }
    

    static async deleteReservation(req:Request,res:Response){
        try {
            const id = new Types.ObjectId(req.body.id)
            const foundReservation = await ReservationsModel.findOne({"_id":id})
            if(foundReservation == null){
                res.send("Not found").json(null)
            }else{
                const deletedReservation = await ReservationsModel.deleteOne({"_id":id})
                await Rooms.deleteOne({"reservation":{ $elemMatch: {"_id":id}}})
                res.send("Deleted").json(deletedReservation)
            }
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    
    

}