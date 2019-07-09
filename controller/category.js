const categoryModel = require('../model/category')
const mongoose = require('mongoose')
const bookModel = require('../model/book')


async function addCategory (req, res, next) {
    try {
        const {title, icon} = req.body
        await categoryModel.create({
            title,
            icon
        })
        res.json({
            code: 200,
            msg: '添加分类成功'
        })
    } catch (error) {
        next(error)
    }
}

async function getCategory (req, res, next) {
    try {
        const data = await categoryModel.find().sort({_id: -1})
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

async function addBookToCategory (req, res, next) {
    try {
        const {categoryId, bookId} = req.body
        const category = await categoryModel.findOne({
            _id: mongoose.Types.ObjectId(categoryId)
        })
        const book = await bookModel.findOne({
            _id: mongoose.Types.ObjectId(bookId)
        })
        if (book) {
            await category.books.push(book._id)
            await category.save()
            res.json({
                code: 200,
                msg: '分类添加成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '添加书籍无效，该书籍不存在'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function getBookByCategory (req, res, next) {
    try {
        let {pn = 1, size = 2, bookSize = 2} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await categoryModel
        .find()
        .sort({_id: -1})
        .populate({
            path: 'books',
            options: {limit: bookSize} 
        })
        .skip((pn -1) * size)
        .limit(size)
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

async function getAllBookByCategory (req, res, next) {
    try {
        const {id} = req.params
        let {pn = 1, size = 2} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await categoryModel
        .findById(id)
        .populate({
            path: 'books',
            options: {limit: size} 
        })
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCategory,
    getCategory,
    addBookToCategory,
    getBookByCategory,
    getAllBookByCategory
}