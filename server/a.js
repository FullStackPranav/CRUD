import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()

const app=express()
app.use(cros())
app.use(express.json())

app.use('/api/users',useRoutes)
const PORT=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server running on ${PORT}`))

})
.catch((err)=>console.error(`Mongo DB connection failed`,err))