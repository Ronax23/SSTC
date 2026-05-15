import express from 'express'
import '../../config/dbConnect.mjs';
import userAdd from '../../controller/User/userAdd.mjs';
import delUser from '../../controller/User/delUser.mjs';
import invoicesCreate from '../../controller/Invoice/invoicesCreate.mjs';
import loginAuth from '../../controller/User/loginControl.mjs';
import passReset from '../../controller/User/passReset.mjs';
import userList from '../../controller/User/userList.mjs';
import dashboard from '../../controller/dashboard.mjs';
import viewBlog from '../../controller/Blogs/viewBlog.mjs';
import createBlog from '../../controller/Blogs/createBlog.mjs';
import addInventory from '../../controller/Inventory/addInventory.mjs';
import deleteInventory from '../../controller/Inventory/deleteInventory.mjs';
import auth from '../../middlewares/auth.mjs';
import listInvoice from '../../controller/Invoice/editInvoice.mjs';
import editInventory from '../../controller/Inventory/editInventory.mjs';
import logoutControl from '../../controller/User/logoutControl.mjs'
import ratelimiter from '../../middlewares/ratelimiter.mjs'

const app=express();
app.use(express.static('../'));

app.get("/", (_req, res) => {
    res.status(200).send("SSTC API");
});
app.delete("/logout",auth,logoutControl)

app.get("/blogs",viewBlog);

app.get("/blog/:id",viewBlog);

app.post("/createBlog",auth,createBlog);

app.get("/userlist",userList);

app.get("/dashboard",auth,dashboard)

app.post("/adduser",userAdd);

app.delete("/userlist/:id",auth,delUser);

app.post("/login",ratelimiter,loginAuth);

app.get("/listinvoice",auth,listInvoice);

app.patch("/forgetpass", passReset);

app.post("/newbill",auth, invoicesCreate);

app.post("/addinventory", auth, addInventory);

app.delete("/deleteinventory/:id", auth, deleteInventory);

app.put("/editinventory/:id", auth, editInventory);

export default app;