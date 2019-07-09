const mongoose = require('mongoose')

const title = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    index: {
        type: Number
    },
    title: String,
    total: {
        type: Number
    }
},{versionKey: false,timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('title', title)