const express = require('express')
const app = express()
const userRouter = require('./routers/user')

app.use(express.json())
app.use('/api/user', userRouter)

module.exports = app