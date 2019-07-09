const {Router} = require('express')
const router = Router()
const {upload} = require('../controller/upload')

router.get('/', upload)

module.exports = router