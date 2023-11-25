const { throw_error } = require('./errorController');
const Product = require('../Models/productsSchema');



const getProductsByCategory = async (req, res) => {
    try {
        const id = req.params.cat_id
        const category = await Category.find({ _id: id });
        if (!category) {
            throw_error("Could Not Find Category")
        }
        const prods = await Product.find({ productCategory: category.category_name });
        if (!prods) {
            throw_error("Products Not Found");
        }
        return res.status(200).json({ message: "Products Found", data: prods });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const productById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id })
        if (!product) {
            throw_error("Product Not Found");
        }
        return res.status(200).json({ message: "Product Found", data: product });
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}


const searchProduct = async (req, res) => {
    try {
        const query = req.params.query;
        if (!query) {
            throw_error("Query Cannot Be Empty");
        }
        

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



module.exports = { productById, getProductsByCategory, searchProduct }