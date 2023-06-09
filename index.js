const express=require("express")
const { connection } = require("./db")
const { userRoute } = require("./routes/userRoute.route")
const { noteRoute } = require("./routes/noteRoute.route")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/notes",noteRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})








