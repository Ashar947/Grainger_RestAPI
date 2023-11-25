const express = require('express');
const router = express.Router();

const { getProductsByCategory, productById,searchProduct } = require('../Controller/productController');

router.route('/products/:cat_id').get(getProductsByCategory);
router.route('/products/:id').get(productById);
router.route('/searchProduct/:query').post(searchProduct)

module.exports = router ;
