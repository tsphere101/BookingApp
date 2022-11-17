
import { Request , Response } from 'express'
import { Reservations } from '../schema/reservationSchema'
import { IReservation } from '../class/IReservation'
import { IReservationSchema } from '../schema/IReservationSchema'

import { model} from 'mongoose'

class AdminEditReservation{
    async EditReservation(req:Request,res:Response){
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
        
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }
}