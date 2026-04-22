import loginModel from "../models/login.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginAuth=    async(req,res)=>{
    try
    {
        const {email,password}=req.body;    
    
    if (!email|| !password){
        res.status(200).json({message:"Email and password are required",login:false});
        return;
    }
    const user=await loginModel.findOne({email:email});
    const passwordMatch=await bcrypt.compare(password,user.password[0]);
    if (user.email===email && passwordMatch){
        const token=jwt.sign({email,password},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",login:true, stats:200, token:token});

        console.log("Login successful");
    }else{
        res.status(200).json({message:"Invalid credentials",login:false, status:300});
        console.log("Invalid credentials");
    }
    }
    catch(err)
    {
        res.status(200).json({message:"Server error",error:err.message,login:false, status:500});
        console.log("Server error",err.message);
    }
}
export default loginAuth;