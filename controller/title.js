const title = require('../model/title');
const mongoose = require('mongoose')

async function getTitle (req, res, next) {
    try {
        const {id} = req.params;
        const data = await title.find({
            bookId: mongoose.Types.ObjectId(id)
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
    getTitle
}