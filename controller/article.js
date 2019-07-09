const articleModel = require('../model/article')
const mongoose = require('mongoose')
const readModel = require('../model/read')
const userModel = require('../model/user')
const bookModel = require('../model/book')
const jwt = require('jsonwebtoken')

function verifyToken (token) {
    return new Promise((reslove, reject) => {
        jwt.verify(token, 'hzx', (err, data) => {
            if (err) {
                reject(err)
                return
            }
            reslove(data.data)
        })
    })
}

async function getArticleById (req, res, next) {
    try {
        const {token} = req.headers || req.body || req.query
        const {id} = req.params
        const data = await articleModel.find({
            titleId: mongoose.Types.ObjectId(id)
        })
        if (token) {
            const userData = await verifyToken(token)
            if (userData) {
                req.user = userData
                const userId = req.user.userId
                readData = await readModel.findOne({
                    userId: userId,
                    book: mongoose.Types.ObjectId(data[0].bookId)
                })
                if (readData) {
                    await readModel.update({
                        userId: userId,
                        book: mongoose.Types.ObjectId(data[0].bookId)
                    },{
                        title: mongoose.Types.ObjectId(data[0].titleId)
                    })
                } else {
                    await readModel.create({
                        userId: userId,
                        book: mongoose.Types.ObjectId(data[0].bookId),
                        title: mongoose.Types.ObjectId(data[0].titleId)
                    })
                    await userModel.update({_id: mongoose.Types.ObjectId(userId)}, {$inc: {read: 1}})
                }
                
            }
        }
        await bookModel.update({_id: mongoose.Types.ObjectId(data[0].bookId)}, {$inc: {looknums: 1}})
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getArticleById
}