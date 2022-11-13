const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


import { Employee } from "../class/Employee";
import { Request, Response } from 'express';
const Registor = require('./EmployeeRegistor.ts')
const Employees = require('../schema/EmployeeSchema')



class EmployeeFactory{

    static async buildEmployee(req:Request,res: Response){
        try {
            const {username,password,email,fname,lname,role} = req.body

            //1. Check is that username and email already exist
            const oldUsername = await Employees.findOne({ username })
            const oldEmail = await Employees.findOne({ email })
            if(oldUsername || oldEmail){
                res.status(400).send("User existed")
            }

            // 2. encryp password
            const encryptedPassword = await bcrypt.hash(password, 10); 

            // 3. Build employee object without token
            const empObj = new Employee(username,encryptedPassword,email,fname,lname,role)
            // await Registor.registor(empObj)
            const addedEmployee = await empObj.register()

            // 4. Make token
            const token = jsonwebtoken.sign(
                { user_id: addedEmployee._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2d" }
              );

            addedEmployee.token = token
            const addedTokenEmployee = await addedEmployee.save()

            res.status(200).json(addedTokenEmployee.toJSON())
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = EmployeeFactory