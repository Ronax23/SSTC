import express from 'express'
import {configDotenv} from 'dotenv'
import cors from 'cors'
import appRoute from './approuting/common/approute.mjs'
configDotenv();
const app=express();


app.use(express.json({limit:"10mb"}));
app.use(cors());
app.use(appRoute);

app.listen(process.env.PORT,()=>{
    console.log("Hi");
})