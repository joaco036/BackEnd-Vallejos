const express       = require("express")
const userRouter    = require("./routes/users.router.js")
const productRouter = require("./routes/porducts.router.js")
const pruebaRouter = require("./routes/pruebas.router.js")
const viewsRouter = require("./routes/views.router.js")
const logger        = require("morgan")
const { uploader }  = require("./utils/multer.js")
const handlebars    = require("express-handlebars")

// import express form express

const app = express()
const port = 8080

console.log(__dirname)

//! para procesar los JSON del cliente
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static(__dirname + "/public"))
app.use (logger("dev"))

//? configuracion del motro de plantillas

app.engine("handlebars", handlebars.engine())
// configurar carpeta donde tomar plantillas
app.set("views", __dirname + "/views")
// extencion de las plantillas
app.set( "view engine","handlebars")

app.use(function(req, res, next){
    console.log("time: ", Date.now())
    next()
})


app.post("/updolader", uploader.single("myFile"), (req, res)=>{
    res.send("archivo subido")
})

app.use("/",viewsRouter)
app.use("/prueba",pruebaRouter)
app.use("/api/users",userRouter)
app.use("/api/products", productRouter)
// app.use("/api/carts", cartRouter)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send("error de server")
})

app.listen(port, () => {
    console.log("escuchando en el puerto:", port)
})