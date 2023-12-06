const express = require('express');
const router = express.Router();

const { getProductsByCategory, productById,searchProduct } = require('../Controller/productController');

router.route('/productsByCategory/:cat_id').get(getProductsByCategory);
router.route('/products/:id').get(productById);
router.route('/searchProduct/:query').post(searchProduct)
router.route('/partsByCategory/:id').get()
router.route('/part/:id').get()
router.route('/parts/search/:query').get()

module.exports = router ;
