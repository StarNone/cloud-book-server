const jwt = require('jsonwebtoken')

function verifyToken (token) {
    return new Promise((reslove, reject) => {
        jwt.verify(token, 'hzx', (err, data) => {
            if (err) {
                reject(err)
                return
            }
            reslove(data.data)
        })
    })
}

async function auth (req, res, next) {
    try {
        const {token} = req.headers || req.body || req.query
        const userData = await verifyToken(token)
        if (userData) {
            req.user = userData
            next()
        } else {
            res.json({
                code: 401,
                msg: '登陆状态已失效，请重新登录！'
            })
        }
    } catch (error) {
        res.json({
            code: 401,
            msg: '登陆状态已失效，请重新登录！'
        })
    }
}

module.exports = {
    auth
}