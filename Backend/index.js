import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDb from "./connectDb.js"
import {User} from "./models/Users.model.js"
dotenv.config({
    path:"./.env"
})

connectDb()
const app = express()
app.use(express.json())

app.post('/api/create', async (req,res)=>{
    const {name,email,age} = req.body
    const user = await User.create({
    name,
    email,
    age
   })
   res.json("User created Successfully ")
})
app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))