
export interface IReservation{
    saveToDB(roomNumber: string,isCheckIn:boolean, isCheckOut:boolean, roomPrice:number, totalPrice:number): any
}