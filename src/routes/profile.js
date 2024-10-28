const express = require("express")
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData) {
            throw new Error("Invalid profile data")
        } 
        const loggedInUser = req.user
        console.log(loggedInUser)

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save()

        res.send(`${loggedInUser.firstName} you profile updated successfully `,)
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

module.exports = profileRouter