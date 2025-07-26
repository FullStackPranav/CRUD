import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import useRoutes from './routes/useRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app=express();
app.use(cors())
app.use(express.json())

app.use('/api/users',useRoutes);
app.use('/api/product',productRoutes)
const PORT=process.env.PORT||5000;



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
.catch((err)=>console.error(`Mongo DB connection failed`,err));