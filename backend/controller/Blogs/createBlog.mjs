import blogs from "../../models/blogs.mjs";
const createBlog = async(req,res) => {
    const {title,content,img}=req.body;
    try{
    if(!title || !content){
        return res.status(200).json({message:"Title and content are required",status:400});
    }
    const newBlog = new blogs({ title,content,img });
    await newBlog.save();
    res.status(200).json({message:"Blog created successfully",status:200});
    }
    catch(err){
        res.status(200).json(
            {message:"Error creating blog", error: err.message,status:500});
        }
}

export default createBlog;