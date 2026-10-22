import mongoose from "mongoose";                 
import blogs from "../../models/blogs.mjs";

const viewBlog = async (req, res) => {
  const { id } = req.params;                     
  const { title,page=+1,limit=5,before } = req.query;                   
console.log({id,title,page,limit,before})
  try {
    if(!id && !title||title=='')
    {
      const [list, totalCount] = await Promise.all([          
      blogs.find({ createdAt: { $lt: before } }).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit),
      blogs.countDocuments(),
    ]);
      return res.status(200).json({message: list.length > 0 ? "Blogs found" : "No blogs",
      status: 200,blog: list,page,total: Math.ceil(totalCount / limit)});
  
    }
    if (id) {
      if (!mongoose.isValidObjectId(id))return res.status(400).json({ message: "Invalid id", status: 400 });
      const blog = await blogs.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found", status: 404 });
      return res.status(200).json({ message: "Blog found", status: 200, blog });
    }
    if (title) {
      const blog = await blogs.find({ title: { $regex: title, $options: "i" } }).sort({ createdAt: -1 });
      if (!blog)return res.status(404).json({ message: "Blog not found", status: 404 });
      return res.status(200).json({ message: "Blog found", status: 200, blog });
    }
    } catch (err) {
    return res.status(500).json({ message: "Error fetching blog", status: 500 });
  }
};

export default viewBlog;