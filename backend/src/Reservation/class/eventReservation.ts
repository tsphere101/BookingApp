import { throws } from 'assert'
import { model } from 'mongoose'
import { IEventReservationSchema } from '../schema/IEventReservationSchema'
import { IReservation } from './IReservation'

import { EventReservationSchema } from "../schema/eventResevationSchema"
// const EventReservationModel = require('../schema/eventResevationSchema')

// const EventReservationModel = require('../schema/eventResevationSchema')
export const EventReservationModel = model<IEventReservationSchema>("EventReservation", EventReservationSchema)

export class EventReservation implements IReservation {

    private prefix: string
    private fname: string
    private lname: string
    private phone: string
    private email: string
    private decision: string
    private min_budget: number
    private max_budget: number
    private company: string
    private address: string
    private zip: string
    private addition: string
    private start: Date
    private end: Date

    constructor(
        prefix: string,
        fname: string,
        lname: string,
        phone: string,
        email: string,
        decision: string,
        min_budget: number,
        max_budget: number,
        company: string,
        address: string,
        zip: string,
        addition: string,
        start: Date,
        end: Date
    ) {


        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.phone = phone
        this.email = email
        this.decision = decision
        this.min_budget = min_budget
        this.max_budget = max_budget
        this.company = company
        this.address = address
        this.zip = zip
        this.addition = addition
        this.start = start
        this.end = end
    }

    async saveToDB() {
        try {
            const EventForAdd = new EventReservationModel({
                prefix: this.prefix,
                fname: this.fname,
                lname: this.lname,
                phone: this.phone,
                email: this.email,
                decision: this.decision,
                min_budget: this.min_budget,
                max_budget: this.max_budget,
                company: this.company,
                address: this.address,
                zip: this.zip,
                addition: this.addition,
                start: this.start,
                end: this.end
            })

            return await EventForAdd.save()
        } catch (error) {
            console.log(error)
            return null
        }
    }
}