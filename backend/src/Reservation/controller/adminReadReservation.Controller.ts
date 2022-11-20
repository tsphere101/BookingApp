
import { Request , Response } from 'express'
import { Reservations } from '../schema/reservationSchema'
import { IReservation } from '../class/IReservation'
import { IReservationSchema } from '../schema/IReservationSchema'

import { model,Types} from 'mongoose'
const ReservationsModel = model<IReservationSchema>("Reservations",Reservations)

class AdminReadReservation{
    static async readReservation(req:Request,res:Response){
        try {
            const { id } = req.body
            const foundReservation = await ReservationsModel.findOne({"_id":new Types.ObjectId(id)})
            res.json(foundReservation?.toJSON())
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }
}

module.exports = AdminReadReservation