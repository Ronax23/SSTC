import otpModel from "../../models/otp.mjs";

const otpCheck=async(req,res,next)=>{
    const {email,otp}=req.body;
    if(!email || !otp){
        return res.status(400).json({message:"Email and OTP are required"});
    }
    try{
        const otpRecord=await otpModel.findOne({email,otp});
        if(!otpRecord){
            return res.status(400).json({message:"Invalid OTP"});
        }
        next();
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}

export default otpCheck;