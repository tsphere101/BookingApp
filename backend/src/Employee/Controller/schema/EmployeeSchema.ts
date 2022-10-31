const mongoose = require('mongoose');
import { Schema, model} from 'mongoose';
import { IEmployee } from './Iemployee';

const Employees = new Schema<IEmployee>({
    "username": {type:String,default: null},
    "fname": {type:String,default: null},
    "lname": {type:String,default: null},
    "email": {type:String,default: null},
    "password": {type:String,default: null},
    "role": {type:String,default: null},
})
module.exports = model<IEmployee>('Employees',Employees)
// module.exports = mongoose.model('Employees',employeeSchema)