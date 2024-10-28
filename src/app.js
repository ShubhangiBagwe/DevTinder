
const express = require("express")
const app = express()
const connectDB = require("./config/database")
const cookiesParser = require("cookie-parser")


app.use(express.json())
app.use(cookiesParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


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