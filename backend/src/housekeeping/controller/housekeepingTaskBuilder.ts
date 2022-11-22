
import { Housekeeping } from "../class/housekeeping"
import {Request } from 'express'

export class housekeepingTaskBuilder{
    public static make(req:Request){
        try {
            const {
                roomNumber,type,condition,roomStatus,arrivalDate,departureDate,frontdeskStatus,assiged,employeeId,doNotDisturb,comment
            } = req.body
            return new Housekeeping(roomNumber,type,condition,roomStatus,arrivalDate,departureDate,frontdeskStatus,assiged,employeeId,doNotDisturb,comment)
        } catch (error) {
            console.log(error)
            return null
        }
    }
}