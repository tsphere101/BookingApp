
import { Request , Response } from 'express'

import { model,Types} from 'mongoose'

const Rooms = require('../../Room/schema/roomSchema')

const ReservationsModel = require('../../Reservation/schema/reservationSchema')

class AdminEditReservation{
    static async editReservation(req:Request,res:Response){
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

    static async deleteReservation(req:Request,res:Response){
        // DELETE method : api/admin/reservation
        try {
            const id = new Types.ObjectId(req.body.id)
            const foundReservation = await ReservationsModel.findOne({"_id":id})
            // if(foundReservation == null){
            //     res.send("Not found").json(null)
            // }
            const deletedReservation = await ReservationsModel.deleteOne({"_id":id})

            await Rooms.updateOne(
                {"reservation":{ $elemMatch: {"_id":id}}},
                {$pull: {
                    "reservation":{
                        "_id": id
                    }
                }}
            )

            res.send("Deleted")
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }
}

module.exports = AdminEditReservation