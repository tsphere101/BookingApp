const mongoose = require('mongoose');
import { Schema, model} from 'mongoose';
import { IEmployeeSchema } from './IEmployee';

const Employees = new Schema<IEmployeeSchema>({
    "username": {type:String,default: null},
    "fname": {type:String,default: null},
    "lname": {type:String,default: null},
    "email": {type:String,default: null},
    "password": {type:String,default: null},
    "role": {type:String,default: null},
    "token": {type:String}
})
module.exports = model<IEmployeeSchema>('Employees',Employees)
// module.exports = mongoose.model('Employees',employeeSchema)