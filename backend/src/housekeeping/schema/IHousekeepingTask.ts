export interface IHousekeepingTask{
    roomNumber:string,
    type: string,
    condition: string,
    roomStatus: string,
    arrivalDate: Date,
    departureDate: Date,
    frontdeskStatus: string,
    assiged: string,
    employeeId: string,
    doNotDisturb: boolean,
    comment: string
}