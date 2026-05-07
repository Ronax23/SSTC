import express from 'express'
import dbConnect from '../../config/dbConnect.mjs';
import userAdd from '../../controller/User/userAdd.mjs';
import delUser from '../../controller/User/delUser.mjs';
import invoicesCreate from '../../controller/Invoice/invoicesCreate.mjs';
import loginAuth from '../../controller/User/loginControl.mjs';
import passReset from '../../controller/User/passReset.mjs';
import userList from '../../controller/User/userList.mjs';
import dashboard from '../../controller/dashboard.mjs';
import con from '../../config/dbConnect.mjs';
import viewBlog from '../../controller/viewBlog.mjs';
import createBlog from '../../controller/createBlog.mjs';
import addInventory from '../../controller/inventory/addInventory.mjs';
import deleteInventory from '../../controller/inventory/deleteInventory.mjs';
import auth from '../../middleware/auth.mjs';
import listInvoice from '../../controller/Invoice/editInvoice.mjs';

console.log(dbConnect);
const app=express();
app.use(express.static('../'));

app.get("/",(req,res)=>{
    console.log("hello world");
    res.send("hello world");
});

app.get("/blogs",viewBlog);

app.get("/blog/:id",viewBlog);

app.post("/createBlog",auth,createBlog);

app.get("/userlist",userList);

app.get("/dashboard",auth,dashboard)

app.post("/adduser",userAdd);

app.delete("/userlist/:id",auth,delUser);

app.post("/login",loginAuth);

app.get("/listinvoice",auth,listInvoice);

app.patch("/forgetpass ",passReset);

app.post("/newbill",auth, invoicesCreate);

app.post("/addinventory", auth, addInventory);

app.delete("/deleteinventory/:id", auth, deleteInventory);

app.put("/editinventory/:id", auth, editInventory);

export default app;