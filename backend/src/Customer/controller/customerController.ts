
import { Request,Response } from "express"
import { Types,model } from "mongoose"
import { Customer } from '../class/Customer'

import { IReservationSchema } from "../../Reservation/schema/IReservationSchema"
const customerModel = require("../schema/CustomerSchema")
const ReservationsModel = require('../../Reservation/schema/reservationSchema')


class CustomerController{
    public static async addCustomer(req:Request,res:Response){
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

    public static async customerList(req:Request,res:Response){
        //GET : admin/guest
        try {
            
            const { attended_guest,country,check_in,check_out,status } = req.query

            console.log(typeof(status))
            // console.log(status?.slice(1,-1))
            
            //attended_guest = new / attended / select All
            //status = Select All / Stayover / cancelled /confirm/not_confirm / checked out
            //country = Thailand USA Select All

            //set default filter
            // let attendFilter = []
            // let countryFilter = []
            // let statusFilter = []
            
            // if(attended_guest?.toString() == 'all'){
            //     attendFilter.push("")
            // }
            // if(country?.toString() == 'all'){

            // }
            // if(status?.toString() == 'all'){

            // }

            
            
            let checkIn: Date = new Date()
            let checkOut: Date = new Date()
            if(check_in != null && check_out){
                if(check_in != ''){
                    checkIn = new Date(check_in.toString())
                }
                if(check_out != ''){
                    checkOut = new Date(check_out.toString())
                }
            }

            const foundReservation = await ReservationsModel.find({
                $or: [{checkIn_date:checkIn},{checkOut_date:checkOut}]
            })

            console.log(foundReservation)

            let customerEmail:String[] = []
            for(let i of foundReservation){
                customerEmail.push(i.email)
            }

            const filtedCustomer = await customerModel.find({

                "attended_guest" : { $in : attended_guest},
                "country": { $in : country},
                "status": { $in : status},
                "email": { $in: customerEmail}

            }).select('fname lname email phone country attended_guest status')
            res.send(filtedCustomer)
        } catch (error) {
            console.log(error)
            res.send("API error").status(500)
        }
    }

    public static async customerCountry(req:Request,res:Response){
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

    public static async customerReservation(req:Request,res:Response){
        // GET : admin/guest/reservation
        try {
            const { email } = req.body
            const filterCustomerReservation = await ReservationsModel.find({
                // _id: new Types.ObjectId(id)
                email: email
            })
            res.json(filterCustomerReservation)
        } catch (error) {
            res.send("API error").status(500)
        }
    }

    
}
module.exports = CustomerController