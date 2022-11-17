import { Request,Response } from 'express'
import { housekeepingTaskBuilder } from './housekeepingTaskBuilder'
import { HousekeepingTaskSchema } from '../schema/housekeepingTaskSchema'
import { IHousekeepingTask} from '../schema/IHousekeepingTask'
import { housekeepingTaskModel } from '../class/housekeeping'

class HousekeepingController{
    static async addHousekeepingTask(req:Request,res:Response){
        // console.log(`adding housekeepingtask..`)
        try {
            const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            const added = await housekeepingTaskObject?.saveToDB()
            res.json(added)
            // console.log(`task ${added?._id} has been assigned to ${added?.assiged}`)
        } catch (error) {
            console.log(error)
            res.send('API error')
        }
    }

    static async changeCondition(req:Request,res:Response){
        try {
            const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            // this line has bug
            // const updateCondition = await housekeepingTaskObject?.changeCondition(req.body._id,req.body.condition)
            // res.json(updateCondition)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    static async getHousekeepings(req:Request,res:Response) {
        // Topfee was here.
        try {
            const housekeepings = await housekeepingTaskModel.find()
            res.json(housekeepings)
        }
        catch(error) {
            console.log(error)
            res.send("API error")
        }
    }

}

module.exports = HousekeepingController
