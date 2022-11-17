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
    static async changeCondition(req: Request, res: Response) {
        // console.log(`changing task ${req.body._id}'s condition`)
        try {
            // const housekeepingTaskObject = housekeepingTaskBuilder.make(req)
            const updateCondition = await Housekeeping.changeCondition(req.body._id, req.body.condition)
            res.json(updateCondition)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get all housekeeping tasks from database.
     */
    static async getHousekeepings(req: Request, res: Response) {
        try {
            const housekeepings = await housekeepingTaskModel.find()
            res.json(housekeepings)
        }
        catch (error) {
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
}

module.exports = HousekeepingController