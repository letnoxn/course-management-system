const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const model = require('./model')
const app = express()

const userRoutre = require('./user')




app.use(cookieParser())
app.use(bodyParser.json({"limit":"10000kb"}))
app.use('/user', userRoutre)
app.listen(8080)