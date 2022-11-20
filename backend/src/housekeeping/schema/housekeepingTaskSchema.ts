
import { Schema } from "mongoose";

import { IHousekeepingTask } from "./IHousekeepingTask";

export const HousekeepingTaskSchema = new Schema<IHousekeepingTask>({
    "roomNumber": {type: String,required:true},
    "type": {type: String,required:true},
    "condition": {type: String,required:true},
    "roomStatus": {type: String,required:true},
    "arrivalDate": {type: Date,required:true},
    "departureDate": {type: Date,required:true},
    "frontdeskStatus": {type: String,required:true},
    "assiged": {type: String,required:true},
    "employeeId": {type: String,required:true},
    "doNotDisturb": {type: Boolean,required:true},
    "comment": {type: String,default:""}
})

