

const customerModel = require("../schema/CustomerSchema")

export class Customer{
    private prefix: string
    private fname: string
    private lname: string
    private email: string
    private phone: string
    private country: string
    private attended_guest: string
    private status: string

    constructor(
        prefix: string,
        fname: string,
        lname: string,
        email: string,
        phone: string,
        country: string,
        attended_guest: string,
        status: string
    ){
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.country = country
        this.attended_guest = attended_guest
        this.status = status
    }

    async saveToDB(){
        try {
            const customer = new customerModel({
                "prefix": this.prefix,
                "fname": this.fname,
                "lname": this.lname,
                "email": this.email,
                "phone": this.phone,
                "country": this.country,
                "attended_guest": this.attended_guest,
                "status": this.status
            })

            const addedCustomer = await customer.save()
            return addedCustomer.toObject()
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async isCustomerExist(fname:string,lname:string,email:string){
        try {
            const isExist = await customerModel.find({
                fname: fname,
                lname: lname
            })
            if(isExist.length > 0){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }


}

/**
 * 
 * this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.address = address
        this.addition = addition
 */