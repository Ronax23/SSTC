import mongoose from 'mongoose'
import {commonSchema} from '../models/User.mjs'


const admin=new mongoose.Schema({
...commonSchema,
firmName:{type:String,required:true,uppercase:true},
firmAddress:{type:String,required:true},
role:{type:String,enum:['superadmin','admin','seller'],default:'seller',required:true,lowercase: true},
GST:{type:String,maxLength:15,required:false,uppercase:true},
PAN:{type:String,maxLength:10,required:true,uppercase:true},
firmState:{type:String,required:false},
status:{type:String,enum:['active','pending','rejected'],default:'pending',index:true,lowercase:true,required:true},
},{timestamps:true})

const adminmodel=mongoose.model('admin',admin)
export default adminmodel;