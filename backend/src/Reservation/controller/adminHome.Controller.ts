
import { Request , Response } from 'express'

const ReservationsModel = require('../schema/reservationSchema')

class AdminHomeController{
    public static async showSummeryHome(req:Request,res:Response){
        try {
            const todayReservation = await AdminHomeController.showReservation(new Date())
            let todayReser = []
            if(todayReservation.length > 0){
                for(let i of todayReservation){
                    let status = ''
                    if(i.isCheckIn == false){
                        status = "Not check in"
                    }else if(i.isCheckIn == true){
                        status = "Arrival"
                    }
                    todayReser.push({
                        "id": i._id,
                        "guest": i.fname + " " + i.lname,
                        "conf": i._id,
                        "room": i.roomNumber,
                        "status": status
                    })
                }
            }
            
            const tomorrowReservation = await AdminHomeController.showReservation(new Date())
            let tomorrowReser = []
            if(tomorrowReservation.length > 0){
                for(let i of tomorrowReservation){
                    let status = ''
                    if(i.isCheckIn == false){
                        status = "Not check in"
                    }else if(i.isCheckIn == true){
                        status = "Arrival"
                    }
                    tomorrowReser.push({
                        "guest": i.fname + " " + i.lname,
                        "conf": i._id,
                        "room": i.roomNumber,
                        "status": status
                    })
                }
            }

            let jsonReservation = 
            {
                "reservation":{
                    "arrivals":{
                        "today": todayReser,
                        "tomorrow": tomorrowReser
                    }    
                }
            }

            let weekOutlook = await AdminHomeController.showWeekOutlook()

                // jsonWeekOutlook = []
                // for(let i of weekOutlook){
                //     {
                //         "2022-10-22":{
                //             "superior": 6,
                //             "delux": 5,
                //             "beach": 2,
                //             "family":2
                //         }
                //     }
                // }

            
        } catch (error) {
            console.log(error)
        }
    }



    public static async showReservation(date:Date){
        try {
            const todayReservation = await ReservationsModel.find({"checkIn_date": date})
            return todayReservation
        } catch (error) {
            console.log(error)
            return []
        }
    }

    public static async showWeekOutlook(){
        try {
            const today = new Date()
            const nextSevenDay = new Date(today.getDate() + 14)

            const reservationThisWeek = await ReservationsModel.find({
                $or: [{ "checkIn_date": { $gt: today}},{"checkOut_date": { $lt:nextSevenDay}}]
            })

        
            return reservationThisWeek

        } catch (error) {
            console.log(error)
            return []
        }
    }
}

module.exports = AdminHomeController

/*
{
    "reservation":{
        "arrivals":{
            "today": [{
                "guest": "Watcharaporn C",
                "conf": "12345",
                "room": "DEL1",
                "status": "Arrival"
            }],
            "tomorrow": [{
                "guest": "Watcharaporn C",
                "conf": "12345",
                "room": "DEL1",
                "status": "Arrival"
            }]
        }    
        "departure":
    },
    "todayActivity":{
        ????
    },
    "weekOutlook":[
        {
            "2022-10-22":{
                "superior": 6,
                "delux": 5,
                "beach": 2,
                "family":2
            }
        }
    ]
}



*/



