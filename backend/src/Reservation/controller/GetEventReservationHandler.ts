
const EReservationModel = require('../schema/eventResevationSchema')

export class GetEventReservationHandler{

    constructor(){
    }

    public async execute(){
        try {
            
            const foundEventReservation = await EReservationModel.find()
            return foundEventReservation
        } catch (error) {
            console.log(error)
            return []
        }
    }
}