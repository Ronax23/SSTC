import {Router} from 'express';
import userAdd from '../../controller/User/userAdd.mjs'
import delUser from '../../controller/User/delUser.mjs'
import userList from '../../controller/User/userList.mjs'
import logoutControl from '../../controller/User/logoutControl.mjs'

const userRoute=Router();

userRoute.post("/add",userAdd);
userRoute.put("/update/:id",userAdd);
userRoute.delete("/delete/:id",delUser);
userRoute.get("/list",userList);
userRoute.delete("/logout",logoutControl)
userRoute.get("/me",(req,res)=>{
   try
   {
     res.status(200).json({
        message:"User is logged in", role:req.user.role
    })
   }
   catch(error)
   {
     res.status(500).json({
        message:"No Role Found"
    })
   }
})


export {userRoute}