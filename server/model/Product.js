import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    Name:{type:String,required:true},
    Quantity:{type:Number},
    Price:{type:Number,required:true},
},{timestamps:true})

export default mongoose.model('Product',productSchema)