const { throw_error } = require('./errorController');
const Product = require('../Models/productsSchema');
const Category = require('../Models/categorySchema');
const ReplacementParts = require('../Models/replacementParts')


// Get All Products For A Specific Category
const getProductsByCategory = async (req, res) => {
    try {
        const limit = 20;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit;
        const id = req.params.cat_id;
        const category = await Category.findOne({ _id: id });

        if (!category) {
            throw new Error("Could Not Find Category");
        }
        const count = await Product.countDocuments({ productCategory: category.category_name });
        const prods = await Product.find({ productCategory: category.category_name }, '_id productCategory mainTitle description image').limit(limit).skip(skip);

        if (!prods || prods.length === 0) {
            throw new Error("Products Not Found");
        }

        return res.status(200).json({
            message: "Products Found",
            data: prods,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Gets Single Product By Id
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

// Gets Products For Search Result
const searchProduct = async (req, res) => {
    try {
        const limit = 24;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit
        const query = req.params.query;
        if (!query) {
            throw_error("Query Cannot Be Empty");
        }
        const count = await Product.countDocuments({ mainTitle: { $regex: query, $options: 'i' } });
        const prod = await Product.find({ mainTitle: { $regex: query, $options: 'i' } }, '_id mainTitle description image').limit(limit).skip(skip);
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

const getPartsByCategory = async (req, res) => {
    try {
        const limit = 20;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit;
        const id = req.params.id;
        const category = await Category.findOne({ _id: id });
        if (!category) {
            throw new Error("Could Not Find Category");
        }
        const count = await ReplacementParts.countDocuments({ category_name: category.category_name });
        const prods = await ReplacementParts.find({ category_name: category.category_name }).limit(limit).skip(skip);

        if (!prods || prods.length === 0) {
            throw new Error("Products Not Found");
        }

        return res.status(200).json({
            message: "Products Found",
            data: prods,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const partById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ReplacementParts.findOne({ _id: id })
        if (!product) {
            throw_error("Product Not Found");
        }
        return res.status(200).json({ message: "Part Found", data: product });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const searchPart = async (req, res) => {
    try {
        const limit = 24;
        let page = Number(req.query.page) || 1;
        let skip = (page - 1) * limit
        const query = req.params.query;
        if (!query) {
            throw_error("Query Cannot Be Empty");
        }
        const count = await ReplacementParts.countDocuments({ title: { $regex: query, $options: 'i' } });
        const prod = await ReplacementParts.find({ title: { $regex: query, $options: 'i' } }).limit(limit).skip(skip);
        if (!prod) {
            throw_error(`No Parts Found With Name ${query}`)
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


module.exports = { productById, getProductsByCategory, searchProduct, getPartsByCategory, partById, searchPart }