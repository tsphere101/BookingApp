import { Filter } from "./housekeepingFilter"

/**
 * 
 * FilterBuilder is used to build Filter object and chain filter keys.
 * used for query housekeeping tasks.
 * 
 */

export class FilterBuilder {
    params: { [index: string]: any }
    filters: Array<string>

    constructor() {
        this.params = {}
        this.filters = []
    }

    /**
     * 
     * @param key filter key name. ex. "condition"
     * @param value desired state of the key condition
     * @returns this
     */
    which(key: string, value: any[]) {

        if (value.length === 0)
            return this

        this.params[key] = { key: key, value: value };
        this.filters.push(key)
        return this
    }

    /**
     * Build the Filter object with the chained filters
     * @returns Filter object.
     */
    build() {
        return new Filter(this.params)
    }

}