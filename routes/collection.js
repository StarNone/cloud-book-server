const {Router} = require('express')
const router = Router()
const {auth} = require('../controller/auth')
const {addCollection, getCollection, deleteCollection} = require('../controller/collection')

router.post('/', auth, addCollection)
router.get('/', auth, getCollection)
router.delete('/:id', auth, deleteCollection)

module.exports = router