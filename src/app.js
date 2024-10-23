
// const express = require("express")

// const app = express()

// require("./config/database.js")

// app.listen(7777, () => {
//     console.log("server is listening the 7777 port")
// })



const express = require("express")
const app = express()
const connectDB = require("./config/database")
const User = require("./models/user")


app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Anju",
        lastNNAme: "Bagwe",
        emailId: "anju@gmail.com",
        password: "pass123"
    })

    try {
        await user.save()
        res.send("add user successfullly")
    } catch (err) {
        res.status(400).send("error saving the usre"+ err.message)
    }
})


connectDB()
    .then(() => {
        console.log("Database connection estamblish")
        app.listen(7777, () => {
            console.log("server is listening the 7777 port")
        })
    })
    .catch((err) => {
        console.error("Database can not be estamblish")
    })