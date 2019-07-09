const {Router} = require('express');
const router = Router();
const {getTitle} = require('../controller/title');

router.get('/:id', getTitle)

module.exports = router