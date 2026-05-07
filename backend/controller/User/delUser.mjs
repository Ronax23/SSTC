import userModel from "../models/User.mjs";
import loginModel from "../models/login.mjs";

const delUser=    async(req,res)=>{
    const {id}=req.params;
    if(!id){
        res.status(200).json({message:"User ID is required",errorcode:400});
    }
   try 
   {
    const del=await userModel.findByIdAndDelete(id);
    if(!del){
        res.status(200).json({message:"User not found",errorcode:400});
    }
    else{
    await loginModel.findOneAndDelete({userref:id});
    res.status(200).json({message:"User deleted successfully"});
   }
}
catch(err){
    res.status(200).json({message:"Server error",error:err.message, errorcode:err.code});       
   
}
}
export default delUser;