const express = require('express')
const Router = express.Router()
const model = require('./model')

Router.use('/login',function(req,res){
    const {user,pwd} = re.body
    user.findOne({user:user,pwd:pwd},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
    })
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
    
})




module.exports = Router