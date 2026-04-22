import express from 'express'
import data from "../../data.json" with { type: 'json' };
import dbConnect from '../../config/dbConnect.mjs';
import userAdd from '../../controller/userAdd.mjs';
import delUser from '../../controller/delUser.mjs';
import invoicesCreate from '../../controller/invoicesCreate.mjs';
import loginAuth from '../../controller/loginControl.mjs';
import passReset from '../../controller/passReset.mjs';
import userList from '../../controller/userList.mjs';
import dashboard from '../../controller/dashboard.mjs';

console.log(dbConnect);
const app=express();
app.use(express.static('../'));

app.get("/",(req,res)=>{
    res.status(200).json(data);
});

app.get("/userlist",userList)

app.get("/dashboard",dashboard)

app.post("/adduser",userAdd);

app.delete("/userlist/:id",delUser);

app.post("/login",loginAuth);

app.post("/forgerpass ",passReset);

app.post("/newbill", invoicesCreate);

export default app;