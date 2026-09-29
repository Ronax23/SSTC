import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    console.log("Incoming Cookies:", req.cookies); // <--- Add this log
    const token=req.cookies.token;
    if(!token){
       return res.status(401).json({message:"Unauthorized",auth:false, status:401});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(200).json({message:"Invalid token",auth:false, status:403});
    }
}
export default authMiddleware;