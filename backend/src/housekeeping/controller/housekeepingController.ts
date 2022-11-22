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
    public static async addHousekeepingTask(req: Request, res: Response) {
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
    public static async changeTaskCondition(req: Request, res: Response) {
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
     * Change the employee who has the responsibility for the specified task id (_id). 
     */
    static async changeAssignedTo(req: Request, res: Response) {
        try {
            const employeeId = req.body.employeeId // body.assigned to should contains employeeId
            const taskId = req.body.taskId
            const updatedTask = await Housekeeping.changeAssignedTo(taskId, employeeId)
            res.json(updatedTask)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Change doNotDisturb status for the specified task id (_id).
     */
    static async changeDoNotDisturb(req: Request, res: Response) {
        try {
            const doNotDisturb = req.body.doNotDisturb
            const taskId = req.body.taskId
            const updatedTask = await Housekeeping.changeDoNotDisturb(taskId, doNotDisturb)
            res.json(updatedTask)
        } catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get all housekeeping tasks from database.
     */
    public static async getHousekeepingTasks(req: Request, res: Response) {
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
     * Get the tasks from the database by filter : RoomType, RoomStatus, Condition, FrontdeskStatus, AssignedEmployeeId.
     * Filter can be multiple values.
     */
    public static async getHousekeepingTasksFilter(req: Request, res: Response) {
        try {
            // Unpack params from req.body
            let filters: any[] = []
            FILTER_KEYS.forEach(key => {
                let values = []
                let value_ = req.query[key]

                if (typeof value_ === "string")
                    values.push(value_)
                if (Array.isArray(value_))
                    values.push(...value_)

                filters.push(
                    {
                        key: key,
                        value: values
                    }
                )
            })

            let result = await Housekeeping.filter(filters)

            res.json(result)

        }
        catch (error) {
            console.log(error)
            res.send("API error")
        }
    }

    /**
     * Get the employees who has the role "housekeeper" from the database.
     */
    public static async getHousekeepers(req: Request, res: Response) {
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
    public static async editHousekeepingTaskComment(req: Request, res: Response) {
        try {
            const taskId = req.body._id
            const newComment = req.body.comment
            const updated = await Housekeeping.editTaskComment(taskId, newComment)
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
    public static async deleteHousekeepingTask(req: Request, res: Response) {
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