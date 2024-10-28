const express = require("express")
const { userAuth } = require("../middlewares/auth")

const requestRouter = express.Router()

requestRouter.get("/sendConnectionReq", userAuth, async (req, res) => {

    const user = req.user
    console.log("Sending the connection req")
    res.send(user.firstName + "send the connection req")
})

module.exports = requestRouter