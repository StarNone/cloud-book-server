const userModel = require('../model/user')
const validator = require('validator')
const smsCodeModel = require('../model/smsCode')
const signUtil = require('../utils/signToken')
const mongoose = require('mongoose')

async function register (req, res, next) {
    try {
        const {phone, code, password} = req.body
        const phoneStatus = validator.isMobilePhone(phone, 'zh-CN')
        if (phoneStatus) {
            const user = await userModel.findOne({
                phone: phone
            })
            if (user) {
                res.json({
                    code: 400,
                    msg: '该用户已注册'
                })
            } else {
                const smsCode = await smsCodeModel.findOne({
                    code
                }).sort({_id: -1})
                if (smsCode) {
                    let smsCodeDate = new Date(smsCode.updateTime)
                    let smsCodeTime = Math.round(smsCodeDate.getTime() / 1000)
                    let nowTime = Math.round(Date.now() / 1000)
                    if ((nowTime - smsCodeTime) < 60 * 5) {
                        if (code === smsCode.code) {
                            await userModel.create({
                                phone,
                                password
                            })
                            res.json({
                                code: 200,
                                msg: '注册成功'
                            })
                        } else {
                            res.json({
                                code: 400,
                                msg: '验证码错误'
                            })
                        }
                    } else {
                        res.json({
                            code: 400,
                            msg: '验证码已过期'
                        })
                    }
                } else {
                    res.json({
                        code: 400,
                        msg: '验证码不正确'
                    })
                }
            }
        } else {
            res.json({
                code: 400,
                msg: '手机格式不正确'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function login (req, res, next) {
    try {
        const {phone, password} = req.body
        if (phone && password) {
            const user = await userModel.findOne({
                phone
            })
            if (user) {
                if (password === user.password) {
                    const token = signUtil({userId: user._id})
                    res.json({
                        code: 200,
                        msg: '登陆成功',
                        data: {
                            token
                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '密码不正确'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: '用户名不正确'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少必要参数'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function getUserById (req, res, next) {
    try {
        const userId = req.user.userId
        const userData = await userModel.findOne({
            _id: mongoose.Types.ObjectId(userId)
        }).select('-password')
        res.json({
            code: 200,
            data: userData
        })
    } catch (error) {
        next(error)
    }
}

async function changePassword (req, res, next) {
    try {
        const id = req.user.userId
        const {password,changePassword} = req.body
        const user = await userModel.findById(id)
        if (password === user.password) {
            await userModel.update({
                _id: mongoose.Types.ObjectId(id)
            }, {
                password: changePassword
            })
            res.json({
                code: 200,
                msg: '密码修改成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '密码输入错误'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function changeMessage (req, res, next) {
    try {
        const userId = req.user.userId
        const {avatar, desc, nikname} = req.body
        if (avatar) {
            await userModel.update({
                _id: mongoose.Types.ObjectId(userId)
            }, {
                avatar
            })
        }
        if (desc) {
            await userModel.update({
                _id: mongoose.Types.ObjectId(userId)
            }, {
                desc
            })
        }
        if (nikname) {
            await userModel.update({
                _id: mongoose.Types.ObjectId(userId)
            }, {
                nikname
            })
        }
        res.json({
            code: 200,
            msg: '信息更改成功'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    getUserById,
    changePassword,
    changeMessage
}