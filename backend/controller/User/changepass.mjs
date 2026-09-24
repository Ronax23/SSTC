import LoginModel from "../../models/login.mjs";
import bcrypt from "bcrypt";

const changePass=async(req,res)=>{
    const {email,oldPassword,newPassword}=req.body;
    if(!email || !newPassword){
        return res.status(400).json({message:"Email and new password are required"});
    }
    try{
       const user=await LoginModel.findOne({email});
       if(!user){
        return res.status(400).json({message:"User not found"});
       }
       await bcrypt.compare(oldPassword,user.password[0])
       const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(newPassword, saltRounds,process.env.JWT_SECRET);
        
        user.passwords = [hashedPassword, ...user.passwords].slice(0, 3);
        await user.save();
        res.status(200).json({message:"Password reset successful"});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}
export default changePass;