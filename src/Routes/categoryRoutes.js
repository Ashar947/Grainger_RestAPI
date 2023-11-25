const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../Controller/categoryController');

router.route('/categories').get(getAllCategories);





module.exports = router ;