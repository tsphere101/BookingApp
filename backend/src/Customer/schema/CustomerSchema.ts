
import { ICustomerSchema } from './ICustomerSchema'
import { Schema,model } from 'mongoose'

const customerSchema = new Schema<ICustomerSchema>({
    "prefix": {type:String,required:true},
    "fname": {type:String,required:true},
    "lname": {type:String,required:true},
    "email": {type:String,required:true},
    "phone": {type:String,required:true},
    "country": {type:String,required:true},
    "addition": {type:String,required:true}
})

module.exports = model<ICustomerSchema>("Customers",customerSchema)