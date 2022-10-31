

export class Employee{
    public username:string
    public password:string
    public email:string
    public fname:string
    public lname:string 
    public role: string 

    constructor(
        username:string,
        password:string,
        email:string,
        fname: string,
        lname:string,
        role:string) 
        {
        this.username = username
        this.password = password
        this.email = email
        this.fname = fname
        this.lname = lname
        this.role = role
    }

    public toJSON(){
        const obj = {
            "fname" : this.fname + " " + this.lname
        }
        return obj
    }


}