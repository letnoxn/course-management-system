const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/blog_data'
mongoose.connect(DB_URL, { useNewUrlParser: true })

const models = {
    user: {
        'user': { 'type': String, require: true },
        'pwd': { 'type': String, require: true },
        'headimg': { 'type': Array },
        'company': { 'type': String },
        'avatar': { 'type': String }
    },
    chat: {
        'userid': { 'type': String, require: true },
        'user': { 'type': String, require: true },
        'content': { 'type': String, require: true },
        'like': { 'type': Number },
        'create_time': { 'type': Number, 'default': new Date().getTime() },
        'comments': [{
            comment: {
                type: String, required: true,
            },
            reply: {
                type: String
            },
            userid: {
                type: String, required: true,
            },
            user: {
                type: String, required: true,
            },
        }]
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