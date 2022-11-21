
import { Request,Response } from "express"
import { Types,model } from "mongoose"
import { Customer } from '../class/Customer'

import { IReservationSchema } from "../../Reservation/schema/IReservationSchema"
const customerModel = require("../schema/CustomerSchema")
const ReservationsModel = require('../../Reservation/schema/reservationSchema')


class CustomerController{
    static async addCustomer(req:Request,res:Response){
        try {
            const { prefix, fname, lname, email,phone,address,guest } = req.body

            //Check customer exist
            const isCustomerExist = await Customer.isCustomerExist(fname,lname,email)
            if(isCustomerExist === false){
                const attendedGuest = "New"
                //initial status of customer
                //????
                const status = "Not confirm"
                const customer = new Customer(prefix, fname, lname, email,phone,address,attendedGuest,status)
                const customerAdded = await customer.saveToDB()
            }else{
                const existCustomer = await customerModel.findOneAndUpdate({
                    fname: fname,
                    lname: lname
                },{
                    attended_guest: "Attend",
                }
                )
            }
            

            // res.json(customerAdded).status(200)
        } catch (error) {
            console.log(error)
            // res.send("API error").status(500)
        }
    }

    static async customerList(req:Request,res:Response){
        //GET : admin/guest
        try {
            //filter
            // const {  }
            
            const filtedCustomer = await customerModel.find().select('fname lname email phone country attended_guest status')
            res.send(filtedCustomer)
        } catch (error) {
            console.log(error)
            res.send("API error").status(500)
        }
    }

    static async customerCountry(req:Request,res:Response){
        //GET : admin/guest/country
        try {
            const customerList = await customerModel.find().select('country')
            let countryList: string[] = []
            for(let i of customerList){
                if(!countryList.includes(i.country)){
                    countryList.push(i.country)
                }
            }
            res.send(countryList)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    static async customerReservation(req:Request,res:Response){
        // GET : admin/guest/reservation
        try {
            const { id } = req.body
            const filterCustomerReservation = await ReservationsModel.find({
                _id: new Types.ObjectId(id)
            })
            res.json(filterCustomerReservation)
        } catch (error) {
            res.send("API error").status(500)
        }
    }
}
module.exports = CustomerController