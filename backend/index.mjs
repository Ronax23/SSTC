import express from 'express'
import {configDotenv} from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import appRoute from './approuting/common/approute.mjs'
configDotenv();
const app=express();


app.use(express.json({limit:"10mb"}));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(cookieParser());
app.use(appRoute);

app.listen(process.env.PORT,()=>{
    console.log("Ola");
})