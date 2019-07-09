const mongoose = require('mongoose')

const book = new mongoose.Schema({
    title: String,
    img: String,
    author: String,
    likenums: {
        type: Number,
        default: 0
    },
    looknums: {
        type: Number,
        default: 0
    },
    desc: String,
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    },
    index: {
        type: Number,
        default: 1
    },
    length: {
        type: Number,
        default: 0
    }
},{versionKey: false,timestamps: {createdAt: 'createTime',updatedAt: 'updateTime'}})

module.exports = mongoose.model('book', book)