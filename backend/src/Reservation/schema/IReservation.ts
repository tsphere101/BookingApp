
import { Types } from "mongoose"
import { IGuest } from "./IGuest"

export interface IReservation{
    fname: string
    lname: string
    email: string
    birthDate: Date
    phone: string
    guest: Types.DocumentArray<IGuest>
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
