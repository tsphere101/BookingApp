import { Types } from "mongoose"


export interface IBooking{
    reservation_id: Types.ObjectId
    checkIn: {
        date: Date
        isCustomerCheckIn: boolean
    }
    checkOut: {
        date: Date
        isCustomerCheckOut: boolean
    }
}