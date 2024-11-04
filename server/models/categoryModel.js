const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    subCategories: [
        {
            type: String,
        },
    ],
    image: {
        type: String,
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
