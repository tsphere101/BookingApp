import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
const mongoose = require('mongoose')
const router = require('./router.js')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

console.log(process.env.PORT)

app.use(express.json())

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  console.log("Hello")
  res.send('Express + TypeScript Server');
});



app.use(cors())

mongoose.connect(process.env.DB_URI)
.then(console.log("Connect to database sucessfully"))
.catch((err:any)=>{console.log(err)})

app.use(express.json())

app.use('/api',router)



module.exports = app