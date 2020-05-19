const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10

  if (body.password === undefined) {
    return res.status(400).json({ error: 'password required' })
  }

  if (body.password.length < 3)
    return res.status(400).json({ error: 'password is too short (required length 3)' })

  if (body.username === undefined)
    return res.status(400).json({ error: 'username required' })

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter