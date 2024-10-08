const express = require('express');
const router = express.Router();

const { getProductsByCategory, productById,searchProduct,getPartsByCategory, partById, searchPart } = require('../Controller/productController');

router.route('/productsByCategory/:cat_id').get(getProductsByCategory);
router.route('/products/:id').get(productById);
router.route('/searchProduct/:query').post(searchProduct)
router.route('/partsByCategory/:id').get(getPartsByCategory)
router.route('/part/:id').get(partById)
router.route('/parts/search/:query').get(searchPart)

module.exports = router ;
