const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")




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

userShema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "Shubhu@123", { expiresIn: "7day" })

    return token
}
userShema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}

module.exports = mongoose.model("user", userShema)