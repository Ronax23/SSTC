import { Router } from 'express';
import { upload } from '../../middlewares/multer.mjs';
import viewBlog from "../../controller/Blogs/viewBlog.mjs"
import createBlog from '../../controller/Blogs/createBlog.mjs';
import deleteBlog from '../../controller/Blogs/deleteBlog.mjs';
import auth from '../../middlewares/auth.mjs';
import generateTags from '../../controller/Blogs/tagsGenAI.mjs'
import {rbac} from '../../middlewares/rbac.mjs';

const blogroutes = Router();


blogroutes.get("/",viewBlog);
blogroutes.get("/:id",viewBlog);
blogroutes.delete("/:id",[auth,rbac],deleteBlog);
blogroutes.post('/tagsgen',[auth,rbac],generateTags)
blogroutes.put("/edit/:id",[auth,rbac,upload.fields([{name:"img", maxCount:1}])],viewBlog);
blogroutes.post("/createblog",[auth,rbac,upload.fields([{name:"img",maxCount:1}])],createBlog);


export default blogroutes;
