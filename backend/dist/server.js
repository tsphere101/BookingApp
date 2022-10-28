"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
console.log(process.env.PORT);
app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// const express = require('express')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const router = require('./router.js')
// const { json } = require('express')
// dotenv.config()
// const app = express()
// app.use(cors())
// app.unsubscribe(express.json())
// app.listen(process.env.PORT,()=>{
//     console.log(`listening to ${process.env.PORT}`)
// })
// mongoose.connect(process.env.DB_URI)
// .then(console.log("Connect to database sucessfully"))
// .catch((err)=>{console.log(err)})
// app.get('/',(req,res)=>{
//     res.send('Hello world')
// })
// app.use(express.json())
// app.use('/api',router)
// module.exports = app
