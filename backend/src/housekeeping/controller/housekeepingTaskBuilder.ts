
import { Housekeeping } from "../class/housekeeping"
import {Request } from 'express'

export class housekeepingTaskBuilder{
    static make(req:Request){
        try {
            const {
                room,type,condition,roomStatus,arrivalDate,departureDate,frontdeskStatus,assiged,doNotDisturb,comment
            } = req.body
            return new Housekeeping(room,type,condition,roomStatus,arrivalDate,departureDate,frontdeskStatus,assiged,doNotDisturb,comment)
            // return housekeepingObject
        } catch (error) {
            console.log(error)
            return null
        }
    }
    //Task
    //Make Builder
    //Make controller
    //reimplement Reservation
    
    //ส่ง Quiz
    //ทำ(ลอก)แลป soft arch
}