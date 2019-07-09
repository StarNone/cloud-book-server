const collectionModel = require('../model/collection')
const userModel = require('../model/user')
const mongoose = require('mongoose')

async function addCollection (req, res, next) {
    try {
        const id = req.user.userId
        const {bookId} = req.body
        if (bookId) {
            const collectionData = await collectionModel.findOne({
                userId: id,
                book: mongoose.Types.ObjectId(bookId)
            })
            if (!collectionData) {
                await collectionModel.create({
                    userId: id,
                    book: mongoose.Types.ObjectId(bookId)
                })
                await userModel.update({_id: mongoose.Types.ObjectId(id)}, {$inc: {collect: 1}})
                res.json({
                    code: 200,
                    msg: '添加收藏成功'
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该书籍已收藏'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '书籍ID不存在'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function getCollection (req, res, next) {
    try {
        const id = req.user.userId
        let {pn = 1, size = 1} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await collectionModel
        .find({
            userId: mongoose.Types.ObjectId(id)
        })
        .sort({_id: -1})
        .skip((pn - 1) * size)
        .limit(size)
        .populate('book')
        .select('-userId')
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

async function deleteCollection (req, res, next) {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const collection = await collectionModel.findById(id)
        if (collection) {
            await collectionModel.remove({_id: mongoose.Types.ObjectId(id)})
            await userModel.update({_id: mongoose.Types.ObjectId(userId)}, {$inc: {collect: -1}})
            res.json({
                code: 200,
                msg: '删除收藏成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该收藏不存在'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCollection,
    getCollection,
    deleteCollection
}