const {Router} = require('express')
const router = Router()
const {auth} = require('../controller/auth')
const {getReadList} = require('../controller/read')

router.get('/', auth, getReadList)

module.exports = router