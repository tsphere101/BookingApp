import { Request, Response } from "express";

export abstract class ARoomController{
    // findEmptyRoom():any
    // findEmptyRoomByDate(req:Request,res:Response):any
    // (req:Request,res:Response): any;
    // abstract findEmptyRoom(req:Request,res:Response): any;
    abstract findEmptyRoom(req:Request,res:Response): any
    
}