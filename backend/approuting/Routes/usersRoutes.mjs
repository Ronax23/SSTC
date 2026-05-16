import {Router} from 'express';
import userAdd from '../../controller/User/userAdd.mjs'
import delUser from '../../controller/User/delUser.mjs'
import userList from '../../controller/User/userList.mjs'
import logoutControl from '../../controller/User/logoutControl.mjs'

const userRoute=Router();

userRoute.post("/add",userAdd);
userRoute.delete("/delete/:id",delUser);
userRoute.get("/list",userList);
userRoute.delete("/logout",logoutControl)


export {userRoute}