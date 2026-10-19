import userModel from '../../models/User.mjs';
import employeeModel from '../../models/employee.mjs';
import loginModel from '../../models/login.mjs';
import bcrypt from 'bcrypt';
import sendMail from '../../services/nodemailer.mjs';
import mongoose from 'mongoose';
import adminmodel from '../../models/admin.mjs';
import uploadImage from "../../utilities/cloudinary.mjs";
import path from 'path';
const userAdd =    async(req,res)=>{
    const {id}=req.params;
    const edit=Boolean(id);
    const {firstName, lastName, email, mob, uname, dob, password, gender, role,
      profileType,address, state,firmName,firmAddress,GST,salary,firmState,overtime,PAN} = req.body; 
    const allFields={email, uname, dob, password, gender, role,address, state,firmName,firmAddress,GST,salary,firmState,overtime}
    const profileImgR= req.files?.profileIMG?.[0]?.path;
    const profileImg = profileImgR ? path.resolve(profileImgR) : null;
    const fixedParams={firstName,lastName,mob,address,state}
                const rawpass=password?password:mob;
    const TargetModel = { customer: userModel, employee: employeeModel, admin: adminmodel }[profileType] || userModel;
   if (edit) {
    try
   {
 const updatedRecord = await TargetModel.findOneAndUpdate(
        {_id:id},
        { ...allFields,...fixedParams  },
        { new: true, runValidators: true }
      );
     let message=!updatedRecord?{message: "Record not found or does not belong to your organisation", status: 404 }:{message: "Record updated successfully", data: updatedRecord,status:200}

      return res.status(200).json(message);
    }catch (err) {
      return res.status(200).json({status: 500, message: "Error updating record", error: err.message });
    }
  }
  
      if(!firstName || !lastName || !email || !mob || !dob || !rawpass||!gender||!role){
            return res.status(200).json({message:"All fields are required",status:400});  
    }
        const session=await mongoose.startSession();
    try{
   const [userExists, employeeExists,adminExist,emailExist] = await Promise.all([
      userModel.findOne({ mob }),
      employeeModel.findOne({ mob }),
      adminmodel.findOne({$or:[{mob},{GST}]}),
      loginModel.findOne({email}),
    ]);
     if(userExists||employeeExists||adminExist){
        return res.status(200).json({message:"User Already Exists",status:409});
    }
    else if(emailExist) {
       return res.status(200).json({message:"Email Already Exists",status:409});
    }
    else 
    {     
let fileURL = "";
if (profileImg)fileURL = await uploadImage(profileImg);       
         let newUser;
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(rawpass, saltRounds,process.env.JWT_SECRET);
        await session.startTransaction();
        if(profileType==='admin')
        {
            newUser=new adminmodel({...fixedParams,dob,gender,role,GST,profilePic:fileURL,firmName,firmAddress,PAN,firmState});
        }
        else if(profileType==='employee'){
            newUser= new employeeModel({...fixedParams,dob,gender,role,profilePic:fileURL,adminref:req.body._id,salary,overtime});
        }
        else{
            newUser=new userModel({...fixedParams,dob,gender,role,profilePic:fileURL,firmName,firmAddress,GST,firmState});
        }
        console.log("newUser",newUser);
             console.log("newUser._id",{email,password:hashedPassword,role,userref:newUser._id, profileType});

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
    });
    }
}  catch(err)
   {
   if (session && session.inTransaction()) {
        try {
            await session.abortTransaction();
        } catch (abortErr) {
            console.error("Error aborting transaction:", abortErr);
        }
    }
    console.log("Error adding user:", err);
    res.status(200).json({message:"Internal Server Error",err:err,status:500});
   }
   finally {
           await session.endSession();

  }
}
export default userAdd;
