import mongoose, { Schema } from "mongoose";
import {commonSchema} from '../models/User.mjs'

 const employeeSchema=Schema({
    ...commonSchema,
    emolyeeId:{type:String,unique:true},
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
      ,default:"customer",lowercase: true},
      overtime:{type:Boolean,default:false},
    salary:{type:Number, min:500,required:true}
 },{timestamps: true})
 employeeSchema.pre('save', async function(next) {
    if (!this.isNew || this.employeeId) {
        return next();
    }
    try {
        const currentYear = new Date().getFullYear();
        const count = await mongoose.model('employee').countDocuments();
        this.employeeId = `EMP-${currentYear}-${1001 + count}`;
        next();
    } catch (error) {
        return next(error);
    }
});
const employeeModel=mongoose.model('employee',employeeSchema)
 export default employeeModel