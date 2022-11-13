
import { Request,Response } from 'express'
import { housekeepingTaskBuilder } from './housekeepingTaskBuilder'

class HousekeepingController{
    static addHousekeepingTask(req:Request,res:Response){
        try {
            const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            const added = housekeepingTaskObject?.saveToDB()
            res.json(added)
        } catch (error) {
            console.log(error)
            res.send('API error')
        }
    }

    static async changeCondition(req:Request,res:Response){
        try {
            const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            const updateCondition = await housekeepingTaskObject?.changeCondition(req.body._id,req.body.condition)
            res.json(updateCondition)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }
}