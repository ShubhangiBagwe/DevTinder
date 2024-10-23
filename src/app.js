
const express = require("express")

const app = express()

// app.use('/',(req,res)=>{
//     res.send("Hello from Dashboard panel working")
// })
// app.use('/test',(req,res)=>{
//     res.send("Hello from test file")
// })
// app.use('/test',(req,res)=>{
//     res.send("Hello from server")
// })

// app.use('/user', (req, res) => {
//     res.send("Namaste")
// })

/****************************************************** HTTP Methods ***************************************************************************/

// app.get('/ab?c', (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get('/ab+c', (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get('/ab*cd', (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get('/a(bc)?d', (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get('/a(bc)+d', (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })


// app.get(/a/, (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get(/.*fly$/, (req, res) => {
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.get('/user/:userId/:name/:password', (req, res) => {
//     // console.log(req.query)
//     console.log(req.params)
//     res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
// })

// app.post('/user', (req, res) => {
//     res.send("data successsfully save to the database")
// })

// app.delete('/user', (req, res) => {
//     res.send("deleted successfully")
// })


/****************************************************** Multiple routes handlers ***************************************************************************/

// app.use(
//     '/user',
//     [(req, res, next) => {
//         console.log("handling the response 1")
//         // res.send("response")
//         next()
//     },
//     (req, res, next) => {
//         console.log("Handking the response 2")
//         // res.send("Response 2")
//         next()
//     }],
//     (req, res, next) => {
//         console.log("Handking the response 3")
//         // res.send("Response 3")
//         next()

//     },
//     (req, res) => {
//         console.log("Handking the response 4")
//         res.send("Response 4")
//     }
// )



/******************************************************  Handling middleware for all get post and all http request ***************************************************************************/


const {adminAuth} = require("./middlewares/auth")
const {userAuth} = require("./middlewares/auth")


// app.use('/admin', (req, res, next) => {
//     console.log("admin auth is getting check")
//     const token = "xyz"
//     const isAdminAuthorized = token === "xyz"
//     if (!isAdminAuthorized) {
//         res.status(401).send("Unauthorized Request")
//     } else {
//         next()
//     }
// })

app.use('/admin',adminAuth)


app.get("/user",userAuth, (req, res) => {
    res.send('User Data')
})


app.get("/user/login",userAuth, (req, res) => {
    res.send('User Login successfully')
})

app.get("/user/data",userAuth, (req, res) => {
    res.send('User Data sent successfully')
})

app.get("/admin/getData", (req, res) => {
    res.send('User Data Send')
})

app.get("/admin/deleteData", (req, res) => {
    res.send("Deleted data successfully")
})


app.listen(7777, () => {
    console.log("server is listening the 7777 port")
}
)