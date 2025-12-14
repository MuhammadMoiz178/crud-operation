import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDb from "./connectDb.js"
dotenv.config({
    path:"./.env"
})

connectDb()
const app = express()
app.use(express.json())


app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))