import mongoose from "mongoose";                 // ⬅️ Bug 1
import blogs from "../../models/blogs.mjs";

const viewBlog = async (req, res) => {
  const { id } = req.params;                     
  const { title } = req.query;                   
  const page  = +req.query.page  || 1;
  const limit = +req.query.limit ||3;

  try {
    if (id) {
      if (!mongoose.isValidObjectId(id))return res.status(400).json({ message: "Invalid id", status: 400 });
      const blog = await blogs.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found", status: 404 });
      return res.status(200).json({ message: "Blog found", status: 200, blog });
    }
    if (title) {
      const blog = await blogs.findOne({ title: { $regex: title, $options: "i" } }).sort({ createdAt: -1 });
      if (!blog)return res.status(404).json({ message: "Blog not found", status: 404 });
      return res.status(200).json({ message: "Blog found", status: 200, blog });
    }
    const [list, totalCount] = await Promise.all([          
      blogs.find().sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit),
      blogs.countDocuments(),
    ]);

    return res.status(200).json({message: list.length > 0 ? "Blogs found" : "No blogs",
      status: 200,blog: list,page,total: Math.ceil(totalCount / limit)});
  } catch (err) {
    console.error("viewBlog error:", err);
    return res.status(500).json({ message: "Error fetching blog", status: 500 });
  }
};

export default viewBlog;