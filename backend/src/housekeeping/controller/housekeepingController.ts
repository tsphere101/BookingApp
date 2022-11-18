import { Request, Response } from 'express'
import { housekeepingTaskBuilder } from './housekeepingTaskBuilder'
import { HousekeepingTaskSchema } from '../schema/housekeepingTaskSchema'
import { IHousekeepingTask } from '../schema/IHousekeepingTask'
import { housekeepingTaskModel } from '../class/housekeeping'
import { Housekeeping } from '../class/housekeeping'
const Employees = require('../../Employee/schema/EmployeeSchema')

class HousekeepingController {
    /**
     * Create a new housekeeping task and save to database.
     */
    static async addHousekeepingTask(req: Request, res: Response) {
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

    /**
     * Change the condition of the existed housekeeping task : ex. [Clean, Dirty] 
     */
    static async changeTaskCondition(req: Request, res: Response) {
        // console.log(`changing task ${req.body._id}'s condition`)
        try {
            // const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            const condition = req.body.condition.toLowerCase()
            const updateCondition = await Housekeeping.changeCondition(req.body._id, condition)
            res.json(updateCondition)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get all housekeeping tasks from database.
     */
    static async getHousekeepingTasks(req: Request, res: Response) {
        try {
            const housekeepingTasks = await housekeepingTaskModel.find()
            res.json(housekeepingTasks)
        }
        catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get the tasks by filter : RoomType, RoomStatus, Condition, FrontdeskStatus, AssignedEmployeeId.
     */
    static async getHousekeepingTasksFilter(req: Request, res: Response) {
        try {
            let {type, roomStatus, condition, frontdeskStatus, employeeId} = req.query
            
            let filter = []
            if (typeof type === "string") 
                filter.push({type:type})
            
            if (typeof condition === "string") 
                filter.push({condition:condition})

            if (typeof roomStatus==="string")
                filter.push({roomStatus:roomStatus})

            if (typeof frontdeskStatus==="string")
                filter.push({frontdeskStatus:frontdeskStatus})

            if (typeof employeeId==="string")
                filter.push({employeeId:employeeId})
            
            
            let housekeepingTasks

            if (filter.length !== 0) {
                housekeepingTasks = await housekeepingTaskModel 
                .find()
                .and(filter)
            }
            else {
                housekeepingTasks = await housekeepingTaskModel 
                .find()
            }

            res.json(housekeepingTasks)
        }
        catch(error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get the employees who has the role "housekeeper" from the database.
     */
    static async getHousekeepers(req: Request, res: Response) {
        try {
            const housekeepers = await Employees.find({ role: "housekeeper" }).exec()
            res.json(housekeepers)
        }
        catch (error) {
            console.log(`${error}`)
            res.send("API error")
        }
    }

    /**
     * Edit the comment of the housekeeping task on the given _id 
     */
    static async editHousekeepingTaskComment(req: Request, res: Response) {
        try {
            const taskId = req.body._id
            const newComment = req.body.comment
            const updated = await Housekeeping.editTaskComment(taskId,newComment)
            res.json(updated)
        }
        catch (error) {
            console.log(`${error}`)
            res.send("API error")
        }
    }

    /**
     * Delete the housekeeping task on given _id 
     */
    static async deleteHousekeepingTask(req: Request, res: Response) {
        try {
            const taskId = req.body._id
            const deleted = await Housekeeping.deleteTask(taskId)
            res.json(deleted)
        }
        catch (error) {
            console.log(`${error}`)
            res.send("API error")
        }
    }

}

module.exports = HousekeepingController