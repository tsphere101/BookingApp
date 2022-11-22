
import { Types } from 'mongoose'

const Rooms = require('../../Room/schema/roomSchema')
const reservationModel = require('../schema/reservationSchema')

export class ChangeReservationStatusHandler{
    private id : Types.ObjectId
    private status : string

    constructor(id: string,status : string){
        this.id = new Types.ObjectId(id)
        this.status = status
    }

    public async execute(){
        try {
            await reservationModel.updateOne(
                {_id: this.id},
                {status: this.status}
            )
            await Rooms.updateOne(
                {"reservation":{ $elemMatch: {"_id":this.id}}},
                {
                    $set: {"reservation.$.status": this.status}
                }
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}