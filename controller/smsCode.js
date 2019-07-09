const smsCode = require('../utils/smsUtils')
const smsCodeModel = require('../model/smsCode')
const userModel = require('../model/user')

async function sendCode (req, res, next) {
    try {
        const {phone} = req.body
        const user = await userModel.findOne({
            phone
        })
        if (!user) {
            let sixStr = ''
            for (let i = 0; i < 6; i ++) {
                sixStr += Math.floor(Math.random() * 10) + ''
            }
            const smsres = await smsCode(phone, sixStr)
            if (smsres.Code === 'OK') {
                await smsCodeModel.create({
                    phone,
                    code: sixStr
                })
                res.json({
                    code: 200,
                    msg: '验证码发送成功'
                })
            } else {
                res.json({
                    code: 500,
                    msg: smsres.Code
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '该用户已注册'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendCode
}