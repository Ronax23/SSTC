import { Schema } from "mongoose";
import {commonSchema} from '../models/User.mjs'

 const employeeSchema=Schema({
    ...commonSchema,
    role:{type:String,enum:["admin","customer","manager","clerk","workers"],default:"user"},
    salary:{type:Number, min:500,required:true}
 },{timestamps: true})

 export default employeeSchema