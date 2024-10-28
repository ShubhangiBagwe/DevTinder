const express = require("express")
const { userAuth } = require("../middlewares/auth")

const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }
})

profileRouter.get("/sendConnectionReq", userAuth, async (req, res) => {

    const user = req.user
    console.log("Sending the connection req")
    res.send(user.firstName + "send the connection req")
})

module.exports = profileRouter