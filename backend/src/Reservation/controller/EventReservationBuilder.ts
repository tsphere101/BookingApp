
import { ReservationFactory } from "./ReservationFactory"

import { Request } from 'express'

export class EventReservationBuilder extends ReservationFactory{
    
    //reservationController -> สร้าง EventReservationBuilder.makeReservation(req) -> สร้าง EventReservationObj -> EventReservationObj -> EventReservationObj.save()
    //

    public async makeReservation(req:Request){
        try {
            // const 
            
        } catch (error) {
            console.log(error)
        }
    }

    

    

    
}

