

const authMiddleware=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(200).json({message:"Unauthorized",auth:false, status:401});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(200).json({message:"Invalid token",auth:false, status:403});
    }
}
export default authMiddleware;