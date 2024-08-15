const { Router } = require("express")

const router = Router()

const users = [
    {id:"1", first_name:"user exsample 1", Email:"user1@gmail.com"},
    {id:"2", first_name:"user exsample 2", Email:"user2@gmail.com"},
    {id:"3", first_name:"user exsample 3", Email:"user3@gmail.com"},
]


router.get("/", (req,res) => {

    const userLogin={
        first_name:" fede",
        role: "admin"
    }
    res.render("index",{
        user: userLogin,
        isAdmin: userLogin.role === "admin",
        users,
        title:"home"
    })
})


module.exports = router