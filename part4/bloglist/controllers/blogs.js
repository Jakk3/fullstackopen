const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.title === undefined || body.url === undefined)
    return res.status(404).json({ error: 'missing title or url' })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const response = await Blog.findByIdAndRemove(id)
  return res.status(200).json(response)
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const response = await Blog.findByIdAndUpdate(id, req.body, { new: true })
  return res.status(200).json(response)
})

module.exports = blogsRouter