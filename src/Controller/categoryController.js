const Category = require('../Models/categorySchema');
const { throw_error } = require('./errorController');

// Gets All Category
const getAllCategories = async(req,res)=>{
    try{
        const categories = await Category.find({},'_id category_name category_image');
        if (!categories){
            throw_error("Could Not Find Categories")
        }
        return res.status(200).json({message:"Categories Found",data:categories});
    }catch(error){
        res.status(400).json({message:error.message})
    }

}

module.exports = {getAllCategories}