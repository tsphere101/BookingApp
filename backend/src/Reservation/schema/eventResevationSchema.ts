import { Schema,model} from 'mongoose'

import { IEventReservationSchema } from "./IEventReservationSchema"

const EventReservationSchema = new Schema<IEventReservationSchema>({
    prefix: {type:String,required:true},
    fname: {type:String,required:true},
    lname: {type:String,required:true},
    phone: {type:String,required:true},
    email: {type:String,required:true},
    companyName: {type:String,required:true},
    country: {type:String,required:true},
    zip: {type:String,required:true},
    addition: {type:String,required:true},
})

module.exports = model<IEventReservationSchema>("EventReservations",EventReservationSchema)