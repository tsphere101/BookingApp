import { IReservation } from './class/IReservation'

class EventReservation implements IReservation{
    
    private prefix: string
    private fname: string
    private lname: string
    private phone: string
    private email: string
    private companyName: string
    private country: string
    private zip: string
    private addition: string

    constructor(prefix: string,
        fname: string,
        lname: string,
        phone: string,
        email: string,
        companyName: string,
        country: string,
        zip: string,
        addition: string){
            
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.phone = phone
        this.email = email
        this.companyName = companyName
        this.country = country
        this.zip = zip
        this.addition = addition
    }

    async saveToDB(roomNumber: string, isCheckIn: boolean, isCheckOut: boolean, roomPrice: number, totalPrice: number) {
        
    }
}