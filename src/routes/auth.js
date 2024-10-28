const express = require("express")
const User = require("../models/user")
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")


const authRouter = express.Router()


authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Invalid Credenntial")
        }

        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {
            const token = await user.getJWT()

            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.send("Login Successfully")
        } else {
            throw new Error("Invalid Credenntial")
        }
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

module.exports = authRouter