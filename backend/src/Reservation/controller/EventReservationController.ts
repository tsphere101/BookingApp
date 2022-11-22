import { Request,Response} from 'express'
import { GetEventReservationHandler } from './GetEventReservationHandler'

class EventReservationController{
    public static async getEventReservation(req:Request,res:Response){
        try {
            const obj = new GetEventReservationHandler()
            const foundEvent = await obj.execute()
            res.send(foundEvent).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = EventReservationController