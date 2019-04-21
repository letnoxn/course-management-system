const express = require('express')


const model = require('./model')
const app = express()

const userRoutre = require('./user')



app.use('/user', userRoutre)


app.listen(8080)