const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true, categories});
    } catch (error) {
        res.status(500).json({succss: false, message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        const categories = await Category.find();
        res.status(201).json({success: true, category, categories});
    } catch (error) {
        res.status(500).json({succss: false, message: error.message });
    }
}

module.exports = {
    getCategories,
    createCategory
}   