const Category = require('../Models/categorySchema');
const { throw_error } = require('./errorController');


const getAllCategories = async(req,res)=>{
    try{
        const categories = await Category.find({});
        if (!categories){
            throw_error("Could Not Find Categories")
        }
        return res.status(200).json({message:"Categories Found",data:categories});
    }catch(error){
        res.status(400).json({message:error.message})
    }

}

module.exports = {getAllCategories}