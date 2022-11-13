export interface IHousekeepingTask{
    type: string,
    condition: string,
    roomStatus: string,
    arrivalDate: Date,
    departureDate: Date,
    frontdeskStatus: string,
    assiged: string,
    doNotDisturb: boolean,
    comment: string
}