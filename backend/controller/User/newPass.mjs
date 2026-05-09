import LoginModel from "../../models/login.mjs";
import otpModel from "../../models/otp.mjs";
import bcrypt from "bcrypt";

const newPass=async(req,res)=>{
    const {email,newPassword}=req.body;
    if(!email || !newPassword){
        return res.status(400).json({message:"Email and new password are required"});
    }
    try{
       const user=await LoginModel.find({email});
       if(!user){
        return res.status(400).json({message:"User not found"});
       }
       const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(newPassword, saltRounds,process.env.JWT_SECRET);
        user.map(async(u)=>{
            
            if(await bcrypt.compare(newPassword,u.password)){
                return res.status(400).json({message:"New password cannot be same as old password"});
            }
        });
        await LoginModel.findOneAndUpdate({email},{password:hashedPassword});
        await otpModel.deleteMany({email});
        res.status(200).json({message:"Password reset successful"});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}