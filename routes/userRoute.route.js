const express=require("express")
const {Usermodel}=require("../models/usermodel.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRoute=express.Router()

userRoute.get("/", async(req,res)=>{
    try {
        const user=await Usermodel.find()
        res.status(200).json({msg:"user get page",user})
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

userRoute.post("/register", async(req,res)=>{
    const {name,email,pass}=req.body
    try {
        const data=await Usermodel.findOne({email})
        if(!data){
            bcrypt.hash(pass,6,async(err,hash)=>{
                if(hash){
                    const user=new Usermodel({name,email,pass:hash})
                    await user.save()
                    res.status(200).json({msg:"new user registered",user})
                }
                else{
                    res.status(400).json({msg:err})
                }
            })
        }
        else{
            res.status(200).json({msg:"user registered already!!"})
        }
        
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

userRoute.post("/login", async(req,res)=>{
    const {email,pass}=req.body
    
    try {
        const user=await Usermodel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,async(err,result)=>{
                if(result){
                    //console.log(email,pass)
                    const token=jwt.sign({userID:user._id,user:user.name},"newOne")
                    res.status(200).json({msg:"logged in successfull!!",user,token})
                }
                else{
                    res.status(400).json({msg:"wrong credential"})
                }
            })
        }
        else{
            res.status(200).json({msg:"registered again!!"})
        }
        
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

module.exports={
    userRoute
}