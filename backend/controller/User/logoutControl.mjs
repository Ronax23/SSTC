 const logout=async(req,res)=>{
    if(!req.cookies.token)
    {
        res.status(200).json({message:"No File Found",status:500})
    }
    try
    {
        res.clearCookie("token", token, { httpOnly: true, secure: true,path: '/' });
        res.status(200).json({message:"Logout Successfully",status:200})
    }
    catch{
        res.status(200).json({message:"An Error Has Occured",status:500})
    }
 }