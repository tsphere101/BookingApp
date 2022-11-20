
import { Request,Response } from "express"
import { Customer } from '../class/Customer'

class CustomerController{
    static async addCustomer(req:Request,res:Response){
        try {
            const { prefix, fname, lname, email,phone,country,addition } = req.body
            const customer = new Customer(prefix, fname, lname, email,phone,country,addition)
            const customerAdded = customer.saveToDB()
            res.json(customerAdded).status(200)
        } catch (error) {
            console.log(error)
            res.send("API error").status(500)
        }
    }
}

module.exports = CustomerController