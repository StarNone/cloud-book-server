const rq = require('request-promise');
const cheerio = require('cheerio');
const bookModel = require('../model/book');
const titleModel = require('../model/title');
const articleModel = require('../model/article');


async function getBook (req, res, next) {
    try {
        const {url, img, author, title} = req.body;
        const data = await rq.get(url)
        // console.log(data)
        const $ = cheerio.load(data)
        let desc
        desc = $('meta[name="description"]').attr('content')
        // console.log(1)
        const book = await bookModel.create({
            title,
            img,
            author,
            desc
        })
        // console.log(2)
        let baseUrl = ''
        let titleArrUrl = []
        let titleText = []
        const titleEle = $('.catalog a')
        let titleArr = url.split('/')
        titleArr.pop()
        baseUrl = titleArr.join('/') + '/'
        // console.log(baseUrl)
        titleEle.each((index, item) => {
            titleArrUrl.push(
                baseUrl + $(item).attr('href')
            )
            titleText.push($(item).text())
        })
        // console.log(titleArrUrl)
        await bookModel.update({
            title
        }, {
            length: titleArrUrl.length
        })
        for (let i = 0; i < titleArrUrl.length; i ++) {
            const item = titleArrUrl[i]
            const index = i;
            const articleData = await rq.get(item)
            const $ = cheerio.load(articleData)
            const content = $('.content').text()
            console.log(index)
            const title = await titleModel.create({
                bookId: book._id,
                title: titleText[index],
                index: Number(index),
                total: titleArrUrl.length
            })

            const article = await articleModel.create({
                bookId: book._id,
                content,
                index: Number(index),
                titleId: title._id
            })
        }

        res.json({
            code: 200,
            msg: '文章爬取成功'
        })
        return
    } catch (error) {
        next(error)
    }
}

async function getBookById (req, res, next) {
    try {
        const {id} = req.params
        const data = await bookModel.findById(id)
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

async function getAllBook (req, res, next) {
    try {
        const data = await bookModel.find()
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBook,
    getBookById,
    getAllBook
}