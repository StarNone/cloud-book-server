const readListModel = require('../model/read')
const mongoose = require('mongoose')

async function getReadList (req, res, next) {
    try {
        const id = req.user.userId
        let {pn = 1, size = 1} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await readListModel
        .find({
            userId: mongoose.Types.ObjectId(id)
        })
        .sort({_id: -1})
        .skip((pn - 1) * size)
        .limit(size)
        .populate('book')
        .populate('title')
        .select('-userId')
        res.json({
            code: 200,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getReadList
}