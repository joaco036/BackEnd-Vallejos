const  express = require("express")
const userRouter = require("./routes/users.router.js")
const productRouter = require("./routes/porducts.router.js")
const logger = require("morgan")

// import express form express

const app = express()
const port = 8080

//! para procesar los JSON del cliente
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static(__dirname + "public"))


app.use(function(req, res, next){
    console.log("time: ", Date.now())
    next()
})

//? endpoint
app.use("/api/users",userRouter)
app.use("/api/products", productRouter)
// app.use("/api/carts", cartRouter)

app.use((error, rea, res, next) => {
    console.log(error,stack)
    res.status(500).send("error de server")
})

app.listen(port, () => {
    console.log("escuchando en el puerto:", port)
})