import mongoose, { model } from 'mongoose'
import {HousekeepingTaskSchema} from '../schema/housekeepingTaskSchema'
import {IHousekeepingTask} from '../schema/IHousekeepingTask'
export const housekeepingTaskModel = model<IHousekeepingTask>("Housekeeping",HousekeepingTaskSchema)

export class Housekeeping{
    private room: string
    private type: string
    private condition: string
    private roomStatus: string
    private arrivalDate: string
    private departureDate: string
    private frontdeskStatus: string
    private assiged: string
    private doNotDisturb: boolean
    private comment: string

    constructor(room: string,
        type: string,
        condition: string,
        roomStatus: string,
        arrivalDate: string,
        departureDate: string,
        frontdeskStatus: string,
        assiged: string,
        doNotDisturb: boolean,
        comment: string){
        this.room = room
        this.type = type
        this.condition = condition
        this.roomStatus = roomStatus
        this.arrivalDate = arrivalDate
        this.departureDate = departureDate
        this.frontdeskStatus = frontdeskStatus
        this.assiged = assiged
        this.doNotDisturb = doNotDisturb
        this.comment = comment
    }

    async saveToDB(){
        try {
            
            const houskeepingTask = new housekeepingTaskModel({
                "type": this.type,
                "condition": this.condition,
                "roomStatus": this.roomStatus,
                "arrivalDate": this.arrivalDate,
                "departureDate": this.departureDate,
                "frontdeskStatus": this.frontdeskStatus,
                "assiged": this.assiged,
                "doNotDisturb": this.doNotDisturb,
                "comment": this.comment
            })
            const addHousekeepingTask = await houskeepingTask.save()
            return addHousekeepingTask

        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    static async changeCondition(_id:string,con:string) {
        try {
            const objId = new mongoose.Types.ObjectId(_id)
            const updatedTask = await housekeepingTaskModel.updateOne({"_id": objId},{"condition":con})
            return updatedTask
        } catch (error) {
            console.log(error)
            return null       
        }
    }

    static async changeRoomStatus(){

    }

    static async deleteTask(id:string){
        try{
            const objId = new mongoose.Types.ObjectId(id)
            return await housekeepingTaskModel.deleteOne({"_id": objId})
        }catch(error){
            console.log(error)
            return null
        }
    }

    static async editTaskComment(_id:string,comment:string) {
        try {
            const objId = new mongoose.Types.ObjectId(_id)
            const updatedTask = await housekeepingTaskModel.updateOne({"_id":objId},{"comment":comment})
            return updatedTask
        } catch (error){
            console.log(`${error}`)
            return null
        }
    }

}