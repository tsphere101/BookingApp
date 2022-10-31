const mongoose = require('mongoose')
import { Request,Response} from "express"
import { Employee } from "../Employee"
// const Employee = require('./schema/EmployeeSchem')
const Employees = require('../schema/EmployeeSchema')

class Registor{
    static async registor(obj:Employee ){
        try {
            const employee = await new Employees({
                "username": obj.username,
                "fname": obj.fname,
                "lname": obj.lname,
                "email": obj.email,
                "password": obj.password,
                "role": obj.role,
            })
            
            const createdEmp = await employee.save()
            console.log("eiei")
            console.log(createdEmp)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Registor