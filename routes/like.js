const {Router} = require('express')
const router = Router()
const {auth} = require('../controller/auth')
const {addLikeBook, getLike, deleteLike} = require('../controller/like')

router.post('/', auth, addLikeBook)
router.get('/', auth, getLike)
router.delete('/:id', auth, deleteLike)

module.exports = router