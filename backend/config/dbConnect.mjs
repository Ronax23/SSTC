import mongoose from 'mongoose'
import {configDotenv} from 'dotenv'
configDotenv();
const con=mongoose.connect(process.env.MONGO).then(()=> console.log("Conectado Ao Banco De Dados"))
.catch((e)=>console.log(e))

export default con;