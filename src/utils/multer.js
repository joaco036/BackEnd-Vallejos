const multer = require("multer")
const {dirname} = require("node:path")

const storage = multer.diskStorage({
    destinaction:(req, file, cb) => {
        cb(null, dirname(__dirname) + "/public/img")
    },
    filename:    (req, file, cb)=>{
        cb(null, `${date.now()}-${file.originalname}`)
    }
})

const uploader = multer ({storage})

module.exports = {
    uploader
}