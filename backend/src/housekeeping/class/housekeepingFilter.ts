import mongoose from "mongoose"
import { IHousekeepingTask } from "../schema/IHousekeepingTask"
import { housekeepingTaskModel } from "./housekeeping"

class Filter {
    query_ 
    constructor (params: {[index:string]:any}) {
    // constructor(params: Array<{key:string,value:string[]}>) {
        let q = housekeepingTaskModel.find()

        

        this.query_ = q
    }

    query() {
        return this.query_
    }


}

export class FilterBuilder {
    // params: {
    //     type: string[]
    //     condition: string[]
    // }
    params : {[index:string]: any}

    constructor() {
        this.params = {
            type:{key:"type",value:new Array<string>},
            condition:{key:"condition",value:new Array<string>},
        }
        // this.params = {
        //     type:[],
        //     condition:[],
        // }
    }

    which(key: string, value: any[]) {
        this.params[key] = {key:key,value:value};

        return this
    }

    build() {
        return new Filter(this.params)
    }

}