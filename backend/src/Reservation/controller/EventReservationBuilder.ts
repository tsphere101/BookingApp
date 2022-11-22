
import { ReservationFactory } from "./ReservationFactory"

import { Request } from 'express'
import { EventReservation } from "../class/eventReservation"


export class EventReservationBuilder extends ReservationFactory{
    async makeReservation(req:Request){
        try {
            const { 
                prefix,
                fname,
                lname,
                phone,
                email, 
                decision,
                min_budget,
                max_budget,
                company,
                address,
                zip,
                addition,
                start,
                end

            } = req.body
            
            return new EventReservation(
                prefix,
                fname,
                lname,
                phone,
                email, 
                decision,
                min_budget,
                max_budget,
                company,
                address,
                zip,
                addition,
                start,
                end
            )
            
        } catch (error) {
            console.log(error)
        }
    }

    

    

    
}

