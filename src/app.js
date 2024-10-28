
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
const bcrypt = require("bcrypt")
const { validateSignUpData } = require("./utils/validation")
const cookiesParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
app.use(express.json())
app.use(cookiesParser())

const { userAuth } = require("./middlewares/auth")

// app.post("/signup", async (req, res) => {
//     // const user = new User({
//     //     firstName: "Rajat",
//     //     lastNNAme: "Bagwe",
//     //     emailId: "rajat@gmail.com",
//     //     password: "pass123"
//     // })

//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.send("add user successfullly")
//     } catch (err) {
//         res.status(400).send("error saving the usre" + err.message)
//     }
// })


app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body

        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        const user = new User({ firstName, lastName, emailId, password: passwordHash })
        await user.save()
        res.send("add user successfullly")
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})


// login api

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Invalid Credenntial")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "Shubhu@123", { expiresIn: "1d" })
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.send("Login Successfully")
        } else {
            throw new Error("Invalid Credenntial")
        }
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

app.get("/sendConnectionReq", userAuth, async (req, res) => {

    const user = req.user
    console.log("Sending the connection req")
    res.send(user.firstName + "send the connection req")
})




// get user by mail

// app.get("/user", async (req, res) => {
//     const userMail = req.body.emailId
//     try {
//         const users = await User.find({ emailId: userMail })
//         if(users.length === 0){
//             res.status(400).send("user not found")
//         }else{
//             res.send(users)
//         }
//     } catch (err) {
//         res.status(400).send("somethinng went wrong")
//     }
// })

// get one mail id

app.get("/user", async (req, res) => {
    const userMail = req.body.emailId
    try {
        const users = await User.findOne({ emailId: userMail })
        if (users.length === 0) {
            res.status(400).send("user not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send("somethinng went wrong")
    }
})

// get all users from the database

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch {
        res.status(400).send("something went wrong")
    }
})

// delete the user

app.delete("/user", async (req, res) => {
    const userID = req.body.userID
    try {
        const users = await User.findByIdAndDelete(userID)
        res.send("user deleted successfully")
    } catch (err) {
        res.status(400).send("somethinng went wrong")
    }
})

// update the data
// app.patch("/user", async (req, res) => {
//     const userID = req.body.userID
//     const data = req.body
//     try {
//         await User.findByIdAndUpdate({ _id: userID }, data, {
//             returnDocument: "after",
//             runValidators: true
//         })
//         res.send("user updated successfully")
//     } catch (err) {
//         res.status(400).send("somethinng went wrong")
//     }
// })

app.patch("/user/:userID", async (req, res) => {
    const userID = req.params?.userID
    const data = req.body
    try {
        const ALLOW_UPDATES = ["emailId", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOW_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (data?.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10")
        }
        const user = await User.findByIdAndUpdate({ _id: userID }, data, {
            returnDocument: "after",
            runValidators: true
        })
        res.send("user updated successfully")
    } catch (err) {
        res.status(400).send("Update Failed: " + err.message)
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