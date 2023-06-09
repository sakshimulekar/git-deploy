const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded=jwt.verify(token,"newOne")
            if(decoded){
                req.body.userID=decoded.userID
                req.body.user=decoded.user
                //console.log(decoded.user,decoded.userID)
                //console.log(decoded)
                next()
                //console.log("next",decoded)
            }
            else{
                res.status(200).json({msg:"not authorized"})
            }
        } catch (error) {
            res.status(400).json({msg:error})
        }
    }
    else{
        res.status(200).json({msg:"login again"})
    }
}

module.exports={
    auth
}