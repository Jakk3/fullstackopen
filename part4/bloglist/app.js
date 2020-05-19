const express = require('express')
const app = express()
require('express-async-errors')
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// parse json bodies (sent by api clients)
app.use(express.json())

app.use(middleware.tokenExtractor)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

app.use(cors())
app.use(express.json())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app