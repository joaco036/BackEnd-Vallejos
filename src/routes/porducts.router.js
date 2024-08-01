const { Router } = require("express")

const router = Router()

//?configuracion

router.get("/", (req, res)=>{
    res.send("get productos")
})


module.exports = router
