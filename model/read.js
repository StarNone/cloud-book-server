const mongooose = require('mongoose')

const readlist = new mongooose.Schema({
    userId: String,
    book: {
        type: mongooose.SchemaTypes.ObjectId,
        ref:'book'
    },
    title: {
        type: mongooose.SchemaTypes.ObjectId,
        ref: 'title'
    }
},{versionKey: false,timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongooose.model('readlist', readlist)