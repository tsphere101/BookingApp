
const Employees = require('../schema/EmployeeSchema')

export class Employee{
    private username:string
    private password:string
    private email:string
    private fname:string
    private lname:string 
    private role: string 
    private token: string

    constructor(
        username:string,
        password:string,
        email:string,
        fname: string,
        lname:string,
        role:string,
        ) 
        {
        this.username = username
        this.password = password
        this.email = email
        this.fname = fname
        this.lname = lname
        this.role = role
        this.token = ''
    }

    async register(){
        try {
            const employeeForAdd = new Employees({
                'username':this.username,
                'password':this.password,
                'email':this.email,
                'fname': this.fname,
                'lname':this.lname,
                'role': this.role
            })
            const employeeForAdded = await employeeForAdd.save()
            return employeeForAdded
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public toJSON(){
        const obj = {
            "fname" : this.fname + " " + this.lname
        }
        return obj
    }


}