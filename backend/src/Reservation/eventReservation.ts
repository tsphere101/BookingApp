import { throws } from 'assert'
import { IReservation } from './class/IReservation'
const EventReservationModel = require('./schema/eventResevationSchema')

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

    async saveToDB() {
        try {
            const EventForAdd = await EventReservationModel({
                prefix: this.prefix,
                fname: this.fname,
                lname: this.lname,
                phone: this.phone,
                email: this.email,
                companyName: this.companyName,
                country: this.country,
                zip: this.zip,
                addition: this.addition
            })
            
            return await EventForAdd.save()
        } catch (error) {
            console.log(error)
            return null
        }
    }
}