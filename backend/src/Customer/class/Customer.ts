

const customerModel = require("../schema/CustomerSchema")

export class Customer{
    private prefix: string
    private fname: string
    private lname: string
    private email: string
    private phone: string
    private country: string
    private addition: string

    constructor(
        prefix: string,
        fname: string,
        lname: string,
        email: string,
        phone: string,
        country: string,
        addition: string
    ){
        this.prefix = prefix
        this.fname = fname
        this.lname = lname
        this.email = email
        this.phone = phone
        this.country = country
        this.addition = addition
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
                "addition": this.addition
            })

            const addedCustomer = await customer.save()
            return addedCustomer.toObject()
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