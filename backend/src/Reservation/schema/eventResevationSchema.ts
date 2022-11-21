import { Schema,model} from 'mongoose'

import { IEventReservationSchema } from "./IEventReservationSchema"

export const EventReservationSchema = new Schema<IEventReservationSchema>({
    "prefix": {type:String,required:true},
    "fname": {type:String,required:true},
    "lname": {type:String,required:true},
    "phone": {type:String,required:true},
    "email": {type:String,required:true},
    "decision": {type:String,required:true},
    "min_budget": {type: Number,require:true},
    "max_budget": {type: Number,require:true},
    "company": {type:String,required:true},
    "address": {type:String,required:true},
    "zip": {type:String,required:true},
    "addition": {type:String,required:true},
    "start":{type: Date,require: true},
    "end": {type: Date,require: true}
})

// module.exports.EventReservationModel = model<IEventReservationSchema>("EventReservations",EventReservationSchema)