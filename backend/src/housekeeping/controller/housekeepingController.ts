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
     * Get the tasks from the database by filter : RoomType, RoomStatus, Condition, FrontdeskStatus, AssignedEmployeeId.
     * Filter can be multiple values.
     */
    static async getHousekeepingTasksFilter(req: Request, res: Response) {
        try {
            let { type, roomStatus, condition, frontdeskStatus, employeeId } = req.query
            /*
             * 
             * type := ex.["beh","sup"] (multiple values)
             * roomStatus := ex.["vacant"] (multiple values)
             * condition := ex.["clean"] (multiple values)
             * frontdeskStatus := ex.["not-reserved","check-out"](multiple values) 
             * employeeId := ex.[] or ["637112d403e528adbec62822","6370ba7976b201aea7853104"](multiple values) 
             * 
             */
            
            // let filters = []

            
            console.log("housekeeping query params :",req.query)

            let query = housekeepingTaskModel .find()

            if (Array.isArray(type)) {
                query = query.in("type",type)
            }
            else if (typeof type !== "undefined"){
                query = query.in("type",[type])
            }

            if (Array.isArray(roomStatus)) {
                query = query.in("roomStatus",roomStatus)
            }
            else if (typeof roomStatus !== "undefined"){
                query = query.in("roomStatus",[roomStatus])
            }

            if (Array.isArray(condition)) {
                query = query.in("condition",condition)
            }
            else if (typeof condition !== "undefined"){
                query = query.in("condition",[condition])
            }

            if (Array.isArray(frontdeskStatus)) {
                query = query.in("frontdeskStatus",frontdeskStatus)
            }
            else if (typeof frontdeskStatus !== "undefined"){
                query = query.in("frontdeskStatus",[frontdeskStatus])
            }
            
            if (Array.isArray(employeeId)) {
                query = query.in("employeeId",employeeId)
            }
            else if (typeof employeeId !== "undefined"){
                query = query.in("employeeId",[employeeId])
            }

            let results = await query.exec()
            
            res.json(results)

            // let r = await Housekeeping.filter()
            // console.log(r)


            // Check if each parameters are defined, otherwise ignore the parameters
            // if (typeof type === "")
            

            // if (typeof type === "string")
            //     filters.push({ type: type })


            // if (typeof condition === "string") 
            //     filters.push({condition:condition})

            // if (typeof roomStatus==="string")
            //     filters.push({roomStatus:roomStatus})

            // if (typeof frontdeskStatus==="string")
            //     filters.push({frontdeskStatus:frontdeskStatus})

            // if (typeof employeeId==="string")
            //     filters.push({employeeId:employeeId})
            
            
            // let housekeepingTasks

            // if (filters.length !== 0) {
            //     housekeepingTasks = await housekeepingTaskModel 
            //     .find()
            //     .and(filters)
            // }
            // else {
            //     housekeepingTasks = await housekeepingTaskModel 
            //     .find()
            // }

            // res.json(housekeepingTasks)
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