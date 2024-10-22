
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

app.get('/user/:userId/:name/:password', (req, res) => {
    // console.log(req.query)
    console.log(req.params)
    res.send({ firstName: 'shubhnagi', lastName: 'Bagwe' })
})

app.post('/user', (req, res) => {
    res.send("data successsfully save to the database")
})

app.delete('/user', (req, res) => {
    res.send("deleted successfully")
})


app.listen(7777, () => {
    console.log("server is listening the 7777 port")
}
)