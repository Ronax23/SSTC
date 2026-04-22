 import loginModel from "../models/login.mjs";

 const passReset=    async(req,res)=>{
    const {names}=req.body;  
    if(!names){
        res.status(200).json({message:"Username is required"});
    }  
    try 
    {


    const user=await loginModel.find({username:names});
    if(user){
        res.status(200).json({message:"Password reset link sent to your email"});
    }else{
        res.status(200).json({message:"User not found"});
    }
}
catch(err){
    res.status(200).json({message:"Server error",error:err.message, status:500});       
}
 }
export default passReset;