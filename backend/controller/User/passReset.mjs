 import loginModel from "../../models/login.mjs";
import sendEmail from "../../services/nodemailer.mjs";
import otpModel from "../../models/otp.mjs";

 const passReset=    async(req,res)=>{
    const {names}=req.body;  
    if(!names){
        res.status(200).json({message:"Username is required"});
    }  
    try 
    {


    const user=await loginModel.findOne({$or:[{username:names},{email:names},{phone:names}]});
    if(user){
        const otp=Math.floor(100000 + Math.random() * 900000);
        await sendEmail(user.email,otp,user.username);
        const newOtp=new otpModel({email:user.email,otp});
        await newOtp.save();
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