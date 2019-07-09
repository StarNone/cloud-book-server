const mongoose = require('mongoose')

const category = new mongoose.Schema({
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    }],
    title: String,
    icon: String,
    index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    }
},{versionKey: false, timestamps:{createdAt: 'createTime',updatedAt: 'updateTime'}})

module.exports = mongoose.model('category', category)