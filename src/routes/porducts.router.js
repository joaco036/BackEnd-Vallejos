const { Router } = require("express")
const ProductsManagerFs = require("../daos/FileSystem/products.manager")


const router = Router()

const {
    getProduct
} = new ProductsManagerFs

router.get("/", async (req, res) => {
    try {
        const productdb = await getProduct()
        res.send({ status: "success", data: productdb })
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    try {
        const { body } = req

        const response = await ProductsManagerFs.createProduct(body)

        res.send({ status: "success", data: response })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productFound = await productsManagerFs.getProduct(req.params)
        res.send(productFound)
    } catch (error) {
        res.send('Producto no encontrado')
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const updateProduct = await productsManagerFs.updateProduct(req.params, req.body)
        res.send({ status: 'success', updateProduct })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const deleteProduct = await productsManagerFs.deleteProduct(req.params)
        res.send({ status: 'succes', deleteProduct })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
