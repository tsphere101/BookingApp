
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


import { Employee } from "../class/Employee";
import { Request, Response } from 'express';
const Employees = require('../schema/EmployeeSchema')

class EmployeeLogin{
  public static async login(req:Request,res:Response){
        try {
            const { username , password } = req.body

            let user = null
            if(username.includes("@")){
                user = await Employees.findOne({ email: username})
            }else{
                user = await Employees.findOne({ username: username})
            }

            if(user == null){
                res.send("Username not found")
            }

            const email = user.email
            if(user && (await bcrypt.compare(password, user.password))){
                const token = jsonwebtoken.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2d",
                    }
                  );
                
                  user.token = token
            }

            await user.save()
            let result = user.toObject()
            delete result["password"]
            console.log(result)
            res.json(result)

        } catch (error) {
            console.log(error)
        }
    }

    public static verifyTokenGetUserID(token:string) {
        try {
          const decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
          return decoded.user_id;
        } catch (err) {
          return false;
        }
      }
}

module.exports = EmployeeLogin