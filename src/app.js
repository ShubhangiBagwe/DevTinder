
const express = require("express")

const app = express()

app.use('/',(req,res)=>{
    res.send("Hello from Dashboard panel working")
})
app.use('/test',(req,res)=>{
    res.send("Hello from test file")
})
app.use('/test',(req,res)=>{
    res.send("Hello from server")
})
app.listen(7777, () =>{
    console.log("server is listening the 7777 port")
}
)