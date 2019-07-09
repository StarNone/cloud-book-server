const {Router} = require('express');
const router = Router();
const {addCategory, getCategory, addBookToCategory, getBookByCategory, getAllBookByCategory} = require('../controller/category')

router.post('/', addCategory)
router.get('/', getCategory)
router.post('/book', addBookToCategory)
router.get('/book', getBookByCategory)
router.get('/:id', getAllBookByCategory)

module.exports = router