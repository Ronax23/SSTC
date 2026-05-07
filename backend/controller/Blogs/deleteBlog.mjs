import Blog from "../../models/blog.mjs";

const deleteBlog = async(req,res)=>{
    const {id}=req.params;
    if(!id){
        res.status(200).json({message:"Blog ID is required",errorcode:400});
    }
   try 
   {
    const del=await Blog.findByIdAndDelete(id);
    res.status(200).json(!del?{message:"Blog not found",errorcode:400}:{message:"Blog deleted successfully"});
}
catch(err){
    res.status(200).json({message:"Server error",error:err.message, errorcode:err.code});       
   
}
}
export default deleteBlog;