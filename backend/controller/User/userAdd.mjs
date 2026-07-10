import userModel from '../../models/User.mjs';
import loginModel from '../../models/login.mjs';
import bcrypt from 'bcrypt';

const userAdd =    async(req,res)=>{
    const {id}=req.params;
    const edit=Boolean(id);
    const {
        firstName, lastName, email, mob, uname, dob, password, gender, role,
        address, state, ...datas
      } = req.body; 
    
   try
   {
    if(edit){
        const user=await userModel.findById(id);
        if(!user){
            return res.status(200).json({message:"User not found",status:400});
        }
        else{
            await user.updateOne(datas);
            return res.status(200).json({message:"User updated successfully",status:200});
        }}
    else{
    if(!firstName || !lastName || !email || !mob || !uname || !dob || !password||!gender||!role){
        console.log(firstName,lastName,email,mob,uname,dob,password,gender,role);
        return res.status(200).json({message:"All fields are required",status:400});
    }
    const news=await userModel.findOne({uname:uname});
     if(await userModel.findOne({uname:uname})){
        console.log(news);
        return res.status(200).json({message:"Username already exists",status:400});
    }
    else 
    {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds,process.env.JWT_SECRET);
    const newUser=new userModel({firstName,lastName,mob,uname,dob,gender});
     newUser.save();
    const newLogin=new loginModel({email,password:hashedPassword,role,userref:newUser._id});
   newLogin.save();
    res.status(200).json({message:"User added successfully",status:200});
    }
}
   }
   catch(err)
   {
    res.status(200).json({message:"Internal Server Error",status:500});
   }
}
export default userAdd;