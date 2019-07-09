const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'http://image.yaojunrong.com/zhenxiang.jpg'
    },
    phone: {
        type: Number,
        unique: true
    },
    desc: String,
    collect: {
        type: Number,
        default: 0
    },
    read: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    password: String,
    nikname: String
}, {versionKey: false, timestamps:{createdAt: 'createTime',updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)