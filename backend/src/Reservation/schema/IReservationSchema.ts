
import { Types } from "mongoose"
import { IGuest } from "./IGuest"

export interface IReservationSchema{
    prefix:string
    fname: string
    lname: string
    email: string
    phone: string
    address: string
    addition: string
    guest: {
        adult: number
        child: number
    }
    roomNumber: string
    checkIn_date: Date
    isCheckIn: boolean
    checkOut_date: Date
    isCheckOut: boolean
    pricePerPerson: number
    discount: number
    totalPrice: number
    book_date: Date
}
