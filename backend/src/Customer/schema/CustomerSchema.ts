
import { ICustomerSchema } from './ICustomerSchema'
import { Schema,model } from 'mongoose'

const customerSchema = new Schema<ICustomerSchema>({
    "prefix": {type:String,required:true},
    "fname": {type:String,required:true},
    "lname": {type:String,required:true},
    "email": {type:String,required:true},
    "phone": {type:String,required:true},
    "address": {type:String,required:true},
    "attended_guest": {type:String,required:true},
    "status": {type:String}
})

module.exports = model<ICustomerSchema>("Customers",customerSchema)