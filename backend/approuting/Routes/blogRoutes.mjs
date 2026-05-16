import { Router } from 'express';
import { upload } from '../../middlewares/multer.mjs';
import viewBlog from "../../controller/Blogs/viewBlog.mjs"
import createBlog from '../../controller/Blogs/createBlog.mjs';
import auth from '../../middlewares/auth.mjs';

const blogroutes = Router();


blogroutes.get("/",viewBlog);

blogroutes.get("/:id",viewBlog);

blogroutes.post("/createblog",auth,upload.fields([{
    name:"blogimg",
    maxCount:1
}]),createBlog);


export default blogroutes;
