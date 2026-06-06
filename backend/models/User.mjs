import mongoose,{ Schema } from "mongoose";

const commonSchema={
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    mob:{type:String,length:10,required:true},
    dob:{type:Date},
    gender:{type:String,enum:["male","female","other"]},
    address:{type:String,required:true},
    state:{type:String,required:true},
    profilePic:{type:String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
}

const users=Schema({
     ...commonSchema,
    uname:{type:String,required:true,unique:true},
},{timestamps: true})

users.methods.getAge = function() {
    if (!this.dob) return null;
    
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


const userModel= mongoose.model("user",users);
export {commonSchema}
export default userModel;