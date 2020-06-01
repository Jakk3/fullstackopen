const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (body.title === undefined || body.url === undefined)
    return res.status(404).json({ error: 'missing title or url' })

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const populatedBlog = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })

  res.status(201).json(populatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (decodedToken.id === blog.user.toString()) {
    const response = await Blog.findByIdAndRemove(id)
    return res.status(200).json(response)
  }

  return res.status(401).json({
    error: 'blog belongs to another user'
  })
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const response = await Blog.findByIdAndUpdate(id, req.body, { new: true })
  return res.status(200).json(response)
})

module.exports = blogsRouter