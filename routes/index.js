var express = require('express');
var router = express.Router();
const bookRoutes = require('./book');
const categoryRoutes = require('./category');
const titleRoutes = require('./title');
const articleRoutes = require('./article');
const userRoutes = require('./users')
const smsCodeRoutes = require('./smsCode')
const uploadRoutes = require('./upload')
const swiperRoutes = require('./swiper')
const collectionRoutes = require('./collection')
const readRoutes = require('./read')
const likeRoutes = require('./like')

router.use('/book', bookRoutes)
router.use('/category', categoryRoutes)
router.use('/title', titleRoutes)
router.use('/article', articleRoutes)
router.use('/user', userRoutes)
router.use('/smsCode', smsCodeRoutes)
router.use('/uploadToken', uploadRoutes)
router.use('/swiper', swiperRoutes)
router.use('/collect', collectionRoutes)
router.use('/readList', readRoutes)
router.use('/like', likeRoutes)
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  })

module.exports = router;
