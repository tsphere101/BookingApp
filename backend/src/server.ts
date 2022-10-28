import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
const mongoose = require('mongoose')
const router = require('./router.js')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

console.log(process.env.PORT)

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



// dotenv.config()

// const app = express()
app.use(cors())

// const url = "mongodb+srv://martha:M0aO2dmGzM2PmUFS@cluster0.xsrtsub.mongodb.net/Chandra?retryWrites=true&w=majority"
mongoose.connect(process.env.DB_URI)
.then(console.log("Connect to database sucessfully"))
.catch((err:any)=>{console.log(err)})

app.use(express.json())

app.use('/api',router)



// module.exports = app