const mongoose = require('mongoose')
const validator = require('validator');


const userShema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,

    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid emailId")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password")
            }
        }
    },

    age: {
        type: String,
        default: "This is default about the user",

    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    },
    skills: {
        type: [String]
    },
},
    {
        timestamps: true
    }
)

const User = mongoose.model("user", userShema)

module.exports = User