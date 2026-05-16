import express from 'express'
import blogroutes from './Routes/blogRoutes.mjs';
import {inv_routes} from '../approuting/Routes/inventoryRoutes.mjs'
import {userRoute} from '../approuting/Routes/usersRoutes.mjs'
import {invoiceRoute} from '../approuting/Routes/invoiceRoutes.mjs'
import '../config/dbConnect.mjs';
import loginAuth from '../controller/User/loginControl.mjs';
import passReset from '../controller/User/passReset.mjs';
import dashboard from '../controller/dashboard.mjs';
import auth from '../middlewares/auth.mjs';
import ratelimiter from '../middlewares/ratelimiter.mjs'


const app=express();
app.use(express.static('../'));

app.use("/blogs",blogroutes)

app.use("/inventory",auth,inv_routes)

app.use("/users",ratelimiter,userRoute)

app.use("/invoice",auth,invoiceRoute)

app.get("/", (_req, res) => {
    res.status(200).send("SSTC API");
});

app.get("/dashboard",auth,dashboard)

app.post("/login",ratelimiter,loginAuth);

app.patch("/forgetpass", passReset);

export default app;