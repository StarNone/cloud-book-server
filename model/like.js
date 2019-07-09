const mongoose = require('mongoose')

const like = new mongoose.Schema({
    userId: String,
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    }
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('like', like)