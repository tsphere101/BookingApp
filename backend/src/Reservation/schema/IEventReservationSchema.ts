export interface IEventReservationSchema{
    prefix:string
    fname:string
    lname:string
    phone:string
    email:string
    decision: string
    min_budget: number
    max_budget: number
    company:string
    address:string
    zip:string
    addition:string
    start: Date
    end: Date
}