const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
        const categories = await Category.find();
        res.status(200).json({success: true, categories});
}

const createCategory = async (req, res) => {
        const category = await Category.create(req.body);
        const categories = await Category.find();
        res.status(201).json({success: true, category, categories});
}

module.exports = {
    getCategories,
    createCategory
}   