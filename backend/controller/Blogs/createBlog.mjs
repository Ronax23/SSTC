import blogs from "../../models/blogs.mjs";
import uploadImage from "../../utilities/cloudinary.mjs";

const createBlog = async(req,res) => {
    const id=req.params.id;
    const {title,content,tags}=req.body;
    const blogImg= req.files?.blogimg[0]?.path;
    let parsedTags = tags?.split(",").map((tag) => tag.trim()).filter(Boolean);

    if(id)
    {
        const updateData = {title,content,tags: parsedTags};
if (blogImg) {
const fileURL = await uploadImage(blogImg);
updateData.img = fileURL.url;
}
        const blogres= await blogs.findByIdAndUpdate(id,{updateData},{new: true});
        if(!blogres) return res.status(200).json({mesage:'Error Has Occured', status:400});
       return res.status(200).json({success: true,status:200});
    }
    try{
    if(!title || !content){
        return res.status(200).json({message:"Title and content are required",status:400});
    }
   
    if(!blogImg)
    {
       res.status(200).json({message:"No Image Found"})
    }
    const fileURL=await uploadImage(blogImg);
    if(!fileURL){return res.status(200).json({message:"Image Is required"})}
    const newBlog = await blogs({
        title,
        content,
        tags:parsedTags,
        img:fileURL.url,
    })
    await newBlog.save();
    return res.status(200).json({message:"Blog created successfully",status:201});
    }
    catch(err){return res.status(200).json({message:"Error creating blog", error: err.message,status:500});}
}

export default createBlog;