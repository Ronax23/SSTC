import mongoose from 'mongoose'
import {commonSchema} from '../models/User.mjs'


const admin=new mongoose.Schema({
...commonSchema,
firmName:{type:String,required:true},
address:{type:String,required:true},
role:{type:String,enum:['superAdmin','admin','seller'],default:'seller',required:true},
GST:{type:String,maxLength:15,required:false,uppercase:true}
})

const adminmodel=mongoose.model('admin',admin)
export default adminmodel;