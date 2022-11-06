import { Types } from "mongoose"
import { IBooking } from "./IBooking"



export interface IRoom{
    roomName: string
    roomNumber: string
    bed_type: string
    guest_amoung:  number
    pricePerPerson_no_breakfast: number
    pricePerPerson_with_breakfast: number
    reservation: Types.DocumentArray<IBooking>
}