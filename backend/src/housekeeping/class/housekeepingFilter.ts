import mongoose from "mongoose"
import { IHousekeepingTask } from "../schema/IHousekeepingTask"
import { housekeepingTaskModel } from "./housekeeping"

class Filter {
    query_
    constructor(params: { [index: string]: any }) {
        let q = housekeepingTaskModel.find()

        let keys = Object.keys(params)
        for (let i in keys) {
            let filter = keys[i]

            let key = params[filter].key
            let value = params[filter].value

            q = q.in(key,value)
        }

        this.query_ = q
    }

    query() {
        return this.query_
    }


}

export class FilterBuilder {
    params: { [index: string]: any }
    filters: Array<string>

    constructor() {
        this.params = {}
        this.filters = []
    }

    which(key: string, value: any[]) {

        if (value.length === 0)
            return this

        this.params[key] = { key: key, value: value };
        this.filters.push(key)
        return this
    }

    build() {
        return new Filter(this.params)
    }

}