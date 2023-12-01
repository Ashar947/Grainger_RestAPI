const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../Controller/categoryController');

// Gets All Categories
router.route('/categories').get(getAllCategories);





module.exports = router ;