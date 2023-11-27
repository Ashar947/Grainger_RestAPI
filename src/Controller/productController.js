const { throw_error } = require('./errorController');
const Product = require('../Models/productsSchema');
const Category = require('../Models/categorySchema');



const getProductsByCategory = async (req, res) => {
    try {
        const limit = 30;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit
        const id = req.params.cat_id
        const category = await Category.findOne({ _id: id });
        if (!category) {
            throw_error("Could Not Find Category")
        }
        console.log(category.category_name)
        const count = await Product.countDocuments({ productCategory: category.category_name });
        // const prods = await Product.find({ productCategory: category.category_name });
        const prods = await Product.find({ productCategory: category.category_name }).limit(limit).skip(skip);
        if (!prods) {
            throw_error("Products Not Found");
        }
        return res.status(200).json({
                message: "Product Found",
                data: prods,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });
        // return res.status(200).json({ message: "Products Found", data: prods });
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
        const limit = 3;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit
        const query = req.params.query;
        if (!query) {
            throw_error("Query Cannot Be Empty");
        }
        const count = await Product.countDocuments({ mainTitle: { $regex: query, $options: 'i' } });
        const prod = await Product.find({ mainTitle: { $regex: query, $options: 'i' } }).limit(limit).skip(skip);
        if (!prod) {
            throw_error(`No Products Found With Name ${query}`)
        }
        return res.status(200).json({
            message: "Product Found",
            data: prod,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



module.exports = { productById, getProductsByCategory, searchProduct }