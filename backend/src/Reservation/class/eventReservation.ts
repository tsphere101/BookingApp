import { throws } from 'assert'
import { IReservation } from './IReservation'
const EventReservationModel = require('./schema/eventResevationSchema')

class EventReservation implements IReservation{
    
    private prefix:string
    private fname:string
    private lname:string
    private phone:string
    private email:string
    private decision: string
    private min_budget: number
    private max_budget: number
    private companyName:string
    private country:string
    private zip:string
    private addition:string
    private start: Date
    private end: Date

    constructor(
        prefix:string,
        fname:string,
        lname:string,
        phone:string,
        email:string,
        decision: string,
        min_budget: number,
        max_budget: number,
        companyName:string,
        country:string,
        zip:string,
        addition:string,
        start: Date,
        end: Date){
            
            this.prefix = prefix,
            this.fname = prefix,
            this.lname = lname,
            this.phone = phone,
            this.email = email,
            this.decision = decision,
            this.min_budget = min_budget,
            this.max_budget = max_budget,
            this.companyName = companyName,
            this.country = country,
            this.zip = zip,
            this.addition = addition,
            this.start = start,
            this.end = end
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