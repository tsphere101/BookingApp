
import { Request , Response } from 'express'
import { Reservations } from '../schema/reservationSchema'
import { IReservation } from '../class/IReservation'
import { IReservationSchema } from '../schema/IReservationSchema'

import { model,Types} from 'mongoose'

const Rooms = require('../../Room/schema/roomSchema')
const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)

class AdminEditReservation{
    async editReservation(req:Request,res:Response){
        // UPDATE method : api/admin/reservation
        try {
            // const { 
            //     prefix,fname,lname,email,phone,address,addition,
            //     guest,
            //     checkIn_date,
            //     checkOut_date,
            //     discount,
            //     breakfast,
            //     roomType,
            //     id
            // } = req.body
            
            const foundReservation = await ReservationsModel.findOne({"_id":new Types.ObjectId(req.body.id)})

            // for(let i of)


            // ***********************

        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    async deleteReservation(req:Request,res:Response){
        // DELETE method : api/admin/reservation
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