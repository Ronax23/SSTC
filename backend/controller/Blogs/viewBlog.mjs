import blogs from "../../models/blogs.mjs";

const viewBlog = async(req,res)=>{
    const {id, title} = req.query;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    let blog;
    try{
        if(id){
            blog = await blogs.findById(id);}
            else if(title){
                blog = await blogs.findOne({title:{$regex:title,$options:"i"}}).sort({createdAt:-1});
            }
            else{
                blog = await blogs.find().sort({createdAt:-1}).limit(limit).skip((page - 1) * limit);
            }

        res.status(200).json(blog.length>0?{message:"Blog found",status:200,blog}:{message:"Blog not found",status:404});
    }
    catch(err){
        res.status(200).json({message:"Error fetching blog", error: err.message,status:500});
    }
}

export default viewBlog;