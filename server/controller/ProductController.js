import Product from "../model/Product.js"

export const addProduct=async(req,res)=>{
    const {Name,Quantity,Price}=req.body

    try {
        const productExists= await Product.findOne({Name})
        if (productExists){
            return res.status(400).json({message:'Product already exists'})
        }

        const newProduct=new Product({
            Name,
            Quantity,
            Price
        })

        await newProduct.save()
        res.status(201).json({message:'product added succesfully'})
    }
    catch(error){
        console.error('Error adding product',error)
        res.status(500).json({message:'server error'})
    }
}

export const getAllProducts=async(req,res)=>{
    try{
        const products= await Product.find()
        res.status(200).json(products);

    }catch(error){
        console.error("Error fetchning Products",error)
        res.status(500).json({message:'server error'})
    }
}

export const deleteProduct=async(req,res)=>{
    const{id}=req.params;
    try{
        const deleted=await Product.findByIdAndDelete(id)
        if(!deleted){
            return res.status(404).json({message:'product not found'})
        }

    }catch(err){
        console.error('Error deleting products',err)
        res.status(500).json({message:'server error'})
    }
}