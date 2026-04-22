import mongoose,{Schema} from "mongoose";

const loginAuth=Schema({
    email:{type:String,required:true,unique:true,include:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    password:{type:[String],required:true},
    role:{type:String,default:"user"},
    userref:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
})

const loginModel= mongoose.model("login",loginAuth);

export default loginModel;