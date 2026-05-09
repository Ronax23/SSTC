import mongoose,{ Schema } from "mongoose";


const userInsert=Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    uname:{type:String,required:true,unique:true},
    mob:{type:String,length:10,required:true},
    dob:{type:Date},
    gender:{type:String,enum:["male","female","other"]},
    role:{type:String,enum:["admin","customer","manager","clerk","workers"],default:"user"},
    profilePic:{type:String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
})

const userModel= mongoose.model("user",userInsert);

export default userModel;