
import { Schema,Types,model } from "mongoose"
import { IReservation } from "./IReservation"
import { IGuest } from "./IGuest"

// type IReservationProps = {
//     guest: Types.DocumentArray<IGuest>
// }

// type ReservationModel = Model<IReservation,{},IReservationProps>

// const ReservationModel = model


// const reservationSchema = new Schema<IReservation>({
    
// })

export const Reservations = new Schema<IReservation>({
    fname: {type:String},
    lname: {type:String},
    email: {type:String},
    birthDate: {type:Date},
    phone: {type:String},
    guest: [{
        name: String,
        gender: String
    }],
    roomNumber: {type:String,require:true},
    checkIn_date:{type:Date},
    isCheckIn: {type:Boolean,default: false},
    checkOut_date:{type:Date},
    isCheckOut: {type:Boolean,default: false},
    pricePerPerson: {type:Number},
    discount: {type:Number},
    totalPrice:{type:Number},
    book_date: {type:Date}
})

// module.exports = model<IReservation>("Reservations",Reservations)