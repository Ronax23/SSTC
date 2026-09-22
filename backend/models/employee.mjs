import mongoose, { Schema } from "mongoose";
import {commonSchema} from '../models/User.mjs'

 const employeeSchema=Schema({
    ...commonSchema,
    role:{type:String,
      enum:[
         "customer",
         "manager",
         "cashier",
         "sales-man",
         "helper",
         "accounts",
         "engineer",
         "backoffice",
         "security",
         "cleaner",
         "worker"]
      ,default:"customer"},
    salary:{type:Number, min:500,required:true}
 },{timestamps: true})
const employeeModel=mongoose.model('employee',employeeSchema)
 export default employeeModel