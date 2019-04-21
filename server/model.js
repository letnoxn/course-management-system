const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/manage'
mongoose.connect(DB_URL, { useNewUrlParser: true })

const models = {

    user: {
        'user': { 'type': String, require: true },
        'pwd': { 'type': String, require: true },
        'headimg':{'type':JSON},
        'company': { 'type': String },
        'avatar':{'type': String }
    },
    goods:{
        'goodsid':{'type':String},
        'name':{'type':String},
        'content':{'type':String},
        'price':{'type':String},
        'num':{'type':Number},
        'create_time':{'type':Number,'default': new Date().getTime()}
    }
    
   
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}