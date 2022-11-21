import { Request } from 'express'

export abstract class ReservationFactory{
    
    private prefix
    private fname
    private lname
    private email
    private phone
    private address
    private checkIn_date
    private checkOut_date

    constructor(
        prefix: string,
        fname: string,
        lname: string,
        email: string,
        phone: string,
        address: string,
        checkIn_date: Date,
        checkOut_date: Date
    ){
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.address = address
        this.checkIn_date = checkIn_date
        this.checkOut_date = checkOut_date
    }
    
    abstract makeReservation(req:Request): Promise<any>
}