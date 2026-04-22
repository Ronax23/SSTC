import mongoose,{ Schema } from "mongoose";


const userInsert=Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    uname:{type:String,required:true,unique:true},
    mob:{type:String,length:10,required:true},
    dob:{type:Date},
    gender:{type:String,enum:["male","female","other"]}
})

const userModel= mongoose.model("use",userInsert);

export default userModel;