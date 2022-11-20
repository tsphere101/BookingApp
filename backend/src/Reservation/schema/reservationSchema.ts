
import { Schema,Types,model } from "mongoose"
import { IReservationSchema } from "./IReservationSchema"

export const Reservations = new Schema<IReservationSchema>({
    prefix: {type:String,required:true},
    fname: {type:String,required:true},
    lname: {type:String,required:true},
    email: {type:String,required:true},
    phone: {type:String,required:true},
    address: {type:String,required:true},
    addition: {type:String, default:"",required:false},
    guest: {
        adult: {type:Number,default:1},
        child: {type:Number,default:0}
    },
    roomNumber: {type:String,require:true},
    checkIn_date:{type:Date},
    isCheckIn: {type:Boolean,default: false},
    checkOut_date:{type:Date},
    isCheckOut: {type:Boolean,default: false},
    pricePerPerson: {type:Number,required:true},
    discount: {type:Number},
    totalPrice:{type:Number},
    book_date: {type:Date}
})

// module.exports = model<IReservation>("Reservations",Reservations)