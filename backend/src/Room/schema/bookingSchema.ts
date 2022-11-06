import { Schema,Types,model } from "mongoose";

import { IBooking } from "./IBooking";

const Bookings = new Schema<IBooking>({
    reservation_id: {type: "ObjectId"},
    checkIn:{
        date:{type:Date},
        isCustomerCheckIn: {type:Boolean}
    },
    checkOut:{
        date:{type:Date},
        isCustomerCheckOut: {type:Boolean}
    }
})

module.exports = model<IBooking>("")