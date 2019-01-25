const express = require('express')
const bodyParser = require('body-parser')

const model = require('./model')
const app = express()

const userRoutre = require('./user')








app.use(bodyParser.json())
app.use('/user', userRoutre)


app.listen(8080)