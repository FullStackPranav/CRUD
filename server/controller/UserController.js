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

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const userExists=await User.findOne({email})
        if(!userExists){
            return res.status(400).json({message:'email doesnt exist'})
        }

        if (password===userExists.password){
            return res.status(200).json({
                message:'login succesfull',
                name:userExists.name,
                phone:userExists.phone
            })}

        else{
            res.status(401).json({message:'incorrect password'})
        }
        
    }
    catch(error){
        console.error('Login error:',error)
        return res.status(500).json({message:'server error'})
    }
}
