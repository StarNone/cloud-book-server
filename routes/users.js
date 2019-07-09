var express = require('express')
var router = express.Router()
const {register,login,getUserById,changePassword,changeMessage} = require('../controller/user')
const {auth} = require('../controller/auth')

/* GET users listing. */
router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getUserById)
router.post('/changePassword', auth, changePassword)
router.put('/', auth, changeMessage)

module.exports = router;
