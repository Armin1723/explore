const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        default: Date.now() + 30 * 24 * 60 * 60 * 1000,
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    transactionId: {
        type: String,
        default: null,
    },
    active: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
})

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;