import LoginModel from "../../models/login.mjs";
import redisClient from "../../config/redisConnect.mjs";  
import bcrypt from "bcrypt";

const newPass=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(200).json({message:"Email and new password are required",status:400});
    }
    try{
        const isVerified = await redisClient.get(`reset_verified:${email}`);
        if (!isVerified) {
          return res.status(403).json({ message: "Unauthorized. Please verify your OTP first.",verified:false });
        }
       const user=await LoginModel.findOne({email});
       if(!user){
        return res.status(400).json({message:"User not found"});
       }
       const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds,process.env.JWT_SECRET);
        const oldhash=user.password||[]
        for(const pass of oldhash){
            if(await bcrypt.compare(password,pass)){
                return res.status(400).json({message:"New password cannot be same as old password"});
            }
        }
        user.password = [hashedPassword, ...oldhash].slice(0, 3);
        await user.save();
        await redisClient.del(`reset_verified:${email}`);
        await redisClient.del(email);
        res.status(200).json({message:"Password reset successful",status:200,verified:true});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}
export { newPass }