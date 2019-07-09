const mongoose = require('mongoose')

const collection = new mongoose.Schema({
    userId: {
        type: String
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    }
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('collection', collection)