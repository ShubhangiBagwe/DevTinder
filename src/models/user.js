const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    }
})

const User = mongoose.model("user", userShema)

module.exports = User