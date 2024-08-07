const fs = require("fs")
const path = "/dbjson/Productdb.json"


class ProductsManagerFs { 
    constructor(){
        this.path = path
    }

    readProducts = async () => {
        if(fs.existsSync(path)){
            const productsJson = await fs.promises.readFile(path, "utf-8")
            const productsJs = JSON.parse(productsJson)
            return productsJs
        }
        return[]
    }
    getProducts = async () =>{
        const products = await this.readProducts()
        return products
    }
    getProduct     = async () =>{}
    createProducts = async newProduct => {
        try {
            const products = await this.readProducts()
            if ( products.length === 0 ) {
                newProduct.id = 1
            }else {
                newProduct.id = products.length + 1
            }

            products.push(newProduct)

            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"))

            return "se ha ahregado el producto"


        } catch (error) {
            console.log(error)
        }
    }
    updateProduct = async (op, ob) => {
        const { pid } = op
        const { name, description, price, stock } = ob
        if (!name || !description || !price || !stock) {
            console.log("ingresar datos del producto para actualizar")
            return
        } else {
            const listadoProductos = await this.readProducts()
            const newProductsList = listadoProductos.map((elemento) => {
                if (elemento.id === parseInt(pid)) {
                    const updatedProduct = {
                        ...elemento,
                        name,
                        description,
                        price,
                        stock
                    }
                    return updatedProduct
                } else {
                    return elemento
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, '\t'))
        }
    }
}

deleteProduct = async (op) => {
    const { pid } = op
    const allProducts = await this.readProducts()
    const productsNoFound = allProducts.filter(
        (elemento) => elemento.id !== parseInt(pid)
    )
    await fs.promises.writeFile(this.path, JSON.stringify(productsNoFound, null, '\t'))
}

module.exports = ProductsManagerFs