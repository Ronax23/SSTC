 import loginModel from "../../models/login.mjs";
import sendEmail from "../../services/nodemailer.mjs";
import redisClient from "../../config/redisConnect.mjs";  

 const passReset=    async(req,res)=>{
    const {names}=req.body;  
    const OTPTime=10*60;
    if(!names){
        res.status(200).json({message:"Username is required"});
    }  
    try 
    {


    const user=await loginModel.findOne({$or:[{username:names},{email:names},{phone:names}]});
    if(user){
        const otp=Math.floor(100000 + Math.random() * 900000);
        await sendEmail(user.email,otp,user.username);
        await redisClient.setEx(user.email, OTPTime, otp);
        res.status(200).json({message:"OTP sent to email"});
    }else{
        res.status(200).json({message:"User not found"});
    }
}
catch(err){
    res.status(200).json({message:"Server error",error:err.message, status:500});       
}
 }
export default passReset;