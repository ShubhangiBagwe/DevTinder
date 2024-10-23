// const mongoose = require('mongoose')
// const connectDB = async () => {
//     await mongoose.connect("mongodb+srv://nodejs:dVrC9PuGyo8JROHx@nodejs.e4kbc.mongodb.net/")
// }

// connectDB()
//     .then(() => {
//         console.log("Database connection estamblish")
//     })
//     .catch((err) => {
//         console.error("Database can not be estamblish")
//     })



const mongoose = require('mongoose')
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nodejs:dVrC9PuGyo8JROHx@nodejs.e4kbc.mongodb.net/")
}

module.exports = connectDB
