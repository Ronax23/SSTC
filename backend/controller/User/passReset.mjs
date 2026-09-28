import loginModel from "../../models/login.mjs";
import sendEmail from "../../services/nodemailer.mjs";
import redisClient from "../../config/redisConnect.mjs";  
import sendMail from "../../services/nodemailer.mjs";

 const passReset=async(req,res)=>{
    const {email}=req.body;  
    const OTPTime=10*60;
    if(!email){
        res.status(200).json({message:"E-Mail is required"});
    }  
    try 
    {


    const user=await loginModel.findOne({email});
    if(!user){return res.status(200).json({message:"User Not Found",status:300})}
        const otp=Math.floor(100000 + Math.random() * 900000);
        await redisClient.setEx(`otp:${email}`, OTPTime, otp.toString());
        sendMail({
            to: user.email,
            type: "OTP",
            data: {otp: otp, name: user.username},
            attachments: []
        });
        res.status(200).json({message:"OTP sent to email",userFound:true});
    
}
catch(err){
    console.log(err)
    res.status(200).json({message:"Server error",error:err.message, status:500});       
}
 }
export default passReset;