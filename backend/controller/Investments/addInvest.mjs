import Investment from "../../models/investment.mjs"
import userModel from "../../models/User.mjs";
import User from "../../models/User.mjs"

const addInvest=(req,res)=>{
    const {mobno,title,investedAmounte,investmentDate,invType}=req.body;
    if(!mobno||!title||!investedAmounte||!investmentDate)
    {
        res.status(200).json({message:"Field Blank"})
    }
    const userid=userModel.findOne({mobno})
    if(!userid){res.status(200).json({message:"No User Found"})}
    switch(invType)
    {
        case"FD":
        
    }
}