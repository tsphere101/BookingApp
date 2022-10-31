import { Employee } from "../Employee";
import { Request, Response } from 'express';
const Registor = require('./EmployeeRegistor.ts')

class EmployeeFactory{

    public static async buildEmployee(req:Request,res: Response){
        try {
            const {username,password,email,fname,lname,role} = req.body
            let emp = new Employee(username,password,email,fname,lname,role)

            console.log(emp)

            await Registor.registor(emp)
            
            res.send(emp.toJSON())
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = EmployeeFactory