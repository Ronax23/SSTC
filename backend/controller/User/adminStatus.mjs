import adminmodel from "../../models/admin.mjs";
const adminStatus=async(req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
    if(!id||!status){
        return res.status(200).json({message:"ID and status are required",status:400});
    }
    try{
        const updatedAdmin=await adminmodel.findByIdAndUpdate(id,{status},{new:true,runValidators:true});
        if(!updatedAdmin)return res.status(200).json({message:"Admin not found",status:404});
        return res.status(200).json({message:"Admin status updated successfully",data:updatedAdmin,status:200});
    }catch(err){
        return res.status(200).json({message:"Error updating admin status",error:err.message,status:500});
    }
}
export default adminStatus;