 const logout=async(req,res)=>{
    if(!req.cookies.token)
    {
        res.status(200).json({message:"No Token",status:500})
    }
    try
    {
        res.clearCookie("token", { httpOnly: true, secure: false,maxAge: 60 * 60 * 1000,path: '/' ,sameSite: 'lax' });
        res.clearCookie("role", { httpOnly: false, secure: false,maxAge: 60 * 60 * 1000,path: '/',sameSite: 'lax' });
        res.status(200).json({message:"Logout Successfully",status:200})
    }
    catch{
        res.status(200).json({message:"An Error Has Occured",status:500})
    }
 }
 export default logout;