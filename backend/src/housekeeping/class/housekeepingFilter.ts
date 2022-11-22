import { housekeepingTaskModel } from "./housekeeping"

/**
 * 
 * Filter class is used to query housekeeping tasks
 * with the with the specified filters.
 * 
 */
export class Filter {
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
