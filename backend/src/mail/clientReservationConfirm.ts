const nodemailer = require('nodemailer')
import {Request,Response} from 'express'

export async function sendEmail(req:Request,res:Response){
    try {
        const { email, text } = req.body
        let transporter = nodemailer.createTransport({
            host: 'gmail',
            service: 'Gmail',
            port: 587,
            secure: false,
            auth: {
                user: "63010229@kmitl.ac.th",
                pass: "rqtitomcgdqbiwbl",
              },
        })

        await transporter.sendMail({
            from: 'chandra@gmail.com',
            to: 'chinnakitglock@gmail.com',
            subject: 'Reservation confirm',
            text: 'Thank you for reservation Chandra hotel'
        })
    } catch (error) {
        console.log(error)
    }
}