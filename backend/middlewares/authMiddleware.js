import jwt from 'jsonwebtoken'

export const authMiddleWare =async (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided. Please login to continue",
      });
    }
    try {
        const decodedInfo  = jwt.verify(token,process.env.JWT_SECRET)
        console.log("token",decodedInfo)

        req.user = decodedInfo
        next()
    } catch (error) {
        return res.status(500).json({
            sucess : false,
            message : "access denied . No token Provided please login to access"
        })
    }
}