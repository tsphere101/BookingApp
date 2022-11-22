
import { Request , Response } from 'express'

import { model,Types} from 'mongoose'
const ReservationsModel = require('../schema/reservationSchema')

class AdminReadReservation{
    public static async readReservation(req:Request,res:Response){
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