const express=require("express")
const { NoteModel } = require("../models/noteModel.model")
const {auth} = require("../middleware/auth.middleware")
const noteRoute=express.Router()

noteRoute.use(auth)

noteRoute.get("/",async(req,res)=>{
    try {
        const note=await NoteModel.find({userID:req.body.userID})
        res.status(200).json({msg:"here are the notes",note})
    } catch (error) {
        res.status(400).json({msg:"error"})
    }
})

noteRoute.post("/add",async(req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).json({msg:"notes added",note})
    } 
    catch (error) {
        res.status(400).json(error)
    }
})

noteRoute.patch("/edit/:noteid",async(req,res)=>{
    const userIdDoc=req.body.userID
    const {noteid}=req.params
    try {
        const note=await NoteModel.findOne({_id:noteid})
        console.log(note)
        const noteIdDoc=note.userID

        if(userIdDoc===noteIdDoc){
            await NoteModel.findByIdAndUpdate({_id:noteid},req.body)
            res.status(200).json({msg:"notes updated"})
        }
        else{
            res.status(200).json({msg:"not authorized"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const userIdDoc=req.body.userID
    try {
        const note=await NoteModel.findOne({_id:id})
        const noteIdDoc=note.userID
        if(userIdDoc===noteIdDoc){
            const del=await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"delete succssfully!!",del})
        }
        else{
            res.status(200).json({msg:"not authorized"})
        }
        
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

module.exports={
    noteRoute
}