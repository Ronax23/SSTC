import mongoose from "mongoose";

const gstSchema=Schema({
    gstNumber:{type:String,required:true,trim:true,minLength:15,maxLength:20,uppercase:true},
    firmName:{type:String,required:true},
    userRef:{type:mongoose.Schema.Types.ObjectId},
    state:{type:String, required:false},
    address:{type:String, required:false}
})

const GST=mongoose.model("gst",gstSchema)
export default GST;