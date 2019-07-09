const mongoose = require('mongoose')
const likeModel = require('../model/like')
const userModel = require('../model/user')
const bookModel = require('../model/book')

async function addLikeBook (req, res, next) {
    try {
        const id = req.user.userId
        const {bookId} = req.body
        if (bookId) {
            const likeData = await likeModel.findOne({
                userId: id,
                book: mongoose.Types.ObjectId(bookId)
            })
            if (!likeData) {
                await likeModel.create({
                    userId: id,
                    book: mongoose.Types.ObjectId(bookId)
                })
                await userModel.update({_id: mongoose.Types.ObjectId(id)}, {$inc: {like: 1}})
                await bookModel.update({_id: mongoose.Types.ObjectId(bookId)}, {$inc: {likenums: 1}})
                res.json({
                    code: 200,
                    msg: '喜欢书籍添加成功'
                })
            } else {
                res.json({
                    code: 400,
                    msg: '该书籍已添加到喜欢'
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

async function getLike (req, res, next) {
    try {
        const id = req.user.userId
        let {pn = 1, size = 1} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await likeModel
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

async function deleteLike (req, res, next) {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const like = await likeModel.findById(id)
        if (like) {
            await likeModel.remove({_id: mongoose.Types.ObjectId(id)})
            await userModel.update({_id: mongoose.Types.ObjectId(userId)}, {$inc: {like: -1}})
            await bookModel.update({_id: mongoose.Types.ObjectId(like.book)}, {$inc: {likenums: -1}})
            res.json({
                code: 200,
                msg: '喜欢的书籍删除成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该喜欢书籍不存在'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addLikeBook,
    getLike,
    deleteLike
}