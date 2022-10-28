const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./router.js')
const { json } = require('express')

dotenv.config()

const app = express()
app.use(cors())
app.unsubscribe(express.json())
app.listen(process.env.PORT,()=>{
    console.log(`listening to ${process.env.PORT}`)
})

mongoose.connect(process.env.DB_URI)
.then(console.log("Connect to database sucessfully"))
.catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use(express.json())

app.use('/api',router)



module.exports = app