import userModel from '../../models/User.mjs';
import employeeModel from '../../models/employee.mjs';
import loginModel from '../../models/login.mjs';
import bcrypt from 'bcrypt';
import sendMail from '../../services/nodemailer.mjs';
import mongoose from 'mongoose';
import adminmodel from '../../models/admin.mjs';
const userAdd =    async(req,res)=>{
    const {id}=req.params;
    const edit=Boolean(id);
    const {
        firstName, lastName, email, mob, uname, dob,empType, password, gender, role,profileType,
        address, state, ...datas
      } = req.body; 
      const fixedParams={firstName,lastName,mob,address,state}
   const TargetModel=empType? employeeModel:userModel;
   if (edit) {
    try
   {
 const updatedRecord = await TargetModel.findOneAndUpdate(
        {_id:id},
        { firstName, lastName, mob, uname, dob, gender, address, state, ...datas },
        { new: true, runValidators: true }
      );
     let message=!updatedRecord?{message: "Record not found or does not belong to your organisation", status: 404 }:{message: "Record updated successfully", data: updatedRecord,status:200}

      return res.status(200).json(message);
    }catch (err) {
      return res.status(200).json({status: 500, message: "Error updating record", error: err.message });
    }
  }
  
      if(!firstName || !lastName || !email || !mob || !uname || !dob || !password||!gender||!role){
            return res.status(200).json({message:"All fields are required",status:400});  
    }
        const session=await mongoose.startSession();
    try{
     await session.startTransaction();
   const [userExists, employeeExists] = await Promise.all([
      userModel.findOne({ uname }).session(session),
      employeeModel.findOne({ uname }).session(session)
    ]);
     if(userExists||employeeExists){
        console.log(userExists);
        await session.abortTransaction();
        return res.status(200).json({message:"Username already exists",status:409});
    }
    else 
    {
        let newUser;
        const saltRounds = 10;
        const rawpass=password?password:mob;
        const hashedPassword = bcrypt.hashSync(rawpass, saltRounds,process.env.JWT_SECRET);
        if(profileType==='admin')
        {
            newUser=new adminmodel({firstName,lastName,mob,uname,dob,gender,role,GST,address})
        }
        else if(profileType==='employee'){
            newUser= new employeeModel({firstName,lastName,mob,uname,dob,gender,role,adminref:req.body._id,...datas});

        }
        else{
            newUser=new userModel({fixedParams,uname,dob,gender,role});
        }
        
     await newUser.save({session});
    const newLogin=new loginModel({email,password:hashedPassword,role,userref:newUser._id, profileType});
  await newLogin.save({session});
       await session.commitTransaction();
    res.status(200).json({message:"User added successfully",status:201});
    sendMail({
        to: email,
        type: "WELCOME",
        data: {name: firstName+" "+lastName},
        attachments: []
    },res);
    }
}  catch(err)
   {
    await session.abortTransaction();
    res.status(200).json({message:"Internal Server Error",status:500});
   }
   finally {
           await session.endSession();
  }
}
export default userAdd;