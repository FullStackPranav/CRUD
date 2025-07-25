import User from "../model/User.js";

export const registerUser=async(req,res)=>{
    const {name,email,phone,password}=req.body;

    try{
        const userExists=await User.findOne({email});
        if (userExists){
            return res.status(400).json({message:'email already exists'});
        }

        const newUser=new User({
            name,
            email,
            phone,
            password,
        })

        await newUser.save()
        res.status(201).json({message:'user registered succesfully'})
    }
    catch(error){
        console.error('Register error:',error)
        res.status(500).json({message:'server error'})
    }
}