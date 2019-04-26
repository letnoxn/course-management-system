const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const bodyParser = require('body-parser')



const jsonParser = bodyParser.json();

const _filter = { 'pwd': 0, '__v': 0 }


Router.use('/login', jsonParser, function (req, res) {
    console.log(req.body);
    const { user, pwd } = req.body
    User.findOne({ user: user, pwd: pwd }, { pwd: 0 }, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: "用户名或密码错误" })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })
    })

})
Router.use('/register', jsonParser, function (req, res) {
    const { user, pwd, fileList } = req.body
    User.findOne({ user: user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        User.create({ user, pwd, headimg: fileList }, function (err, doc) {
            if (err) {
                return res.json({ code: 1, msg: '后端出错' })
            }
            res.cookie('userid', doc._id)
            return res.json({ code: 0 })
        })
    })
})

Router.get('/info', function (req, res) {
    //用户有没有cookie
    const { userid } = req.cookies || {}
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后端出错' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

Router.use('/userupdata', function (req, res) {

    const { user, opwd, npwd, fileList} = req.body
    console.log(fileList)
    User.findOneAndUpdate({ user: user, pwd: opwd }, { pwd:npwd, headimg:fileList }, function (err, doc) {

        if (!doc) {
            return res.json({ code: 1, msg: "原密码错误" })
        }
        if (err) {
            return res.json({ code: 1, msg:err })
        }
        return res.json({ code: 0 })
    })
})

module.exports = Router