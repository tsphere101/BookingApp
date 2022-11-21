
import { Schema,model ,Types} from "mongoose"
import { IRoom } from "./IRoom"
// import { Reservations } from "../../Reservation/schema/reservationSchema"

// const Reservations = require("../../Reservation/schema/reservationSchema")
import { IReservationSchema } from "../../Reservation/schema/IReservationSchema"

const Rooms = new Schema<IRoom>({
    roomName: { type: String},
    roomNumber: {type:String},
    bed_type: {type:String},
    guest_amoung: {type: Number},
    pricePerPerson_no_breakfast: {type:Number},
    pricePerPerson_with_breakfast: {type:Number},
    reservation: []
})

module.exports = model<IRoom>("Rooms",Rooms)