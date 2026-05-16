import blogs from "../../models/blogs.mjs";
import uploadImage from "../../utilities/cloudinary.mjs";

const createBlog = async(req,res) => {
    const {title,content}=req.body;
    const blogImg= req.files?.blogimg[0]?.path;
    try{
    if(!title || !content){
        return res.status(200).json({message:"Title and content are required",status:400});
    }
   
    if(!blogImg)
    {
       res.status(200).json({message:"No Image Found"})
    }
    const fileURL=await uploadImage(blogImg);
    if(!fileURL){res.status(200).json({message:"Image Is required"})}
    const newBlog = await blogs.insertOne({
        title,
        content,
        img:fileURL.url,
    })
    await newBlog.save();
    res.status(200).json({message:"Blog created successfully",status:200});
    }
    catch(err){
        res.status(200).json(
            {message:"Error creating blog", error: err.message,status:500});
        }
}

export default createBlog;