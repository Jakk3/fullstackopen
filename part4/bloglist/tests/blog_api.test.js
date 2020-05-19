const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5ec461c06fa6733e748f4ab6",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "5ec461c06fa6733e748f4ab6",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

let token = null

beforeEach(async () => {
  // delete all blogs from test database
  await Blog.deleteMany({})

  // create a blog object of each blog in the array
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  // create an array to strore promises of saving the blog to the database
  const promiseArray = blogObjects.map(blog => blog.save())

  // Promise.all(arr) waits untill all of the promises in the array have been completed
  await Promise.all(promiseArray)

  const login = await api.post('/api/login').send({ username: "Hamilton", password: "supersecret" })
  token = login.body.token
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blog has field "id", not "_id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('valid blog is posted to database', async () => {
  const blog = {
    title: "Thomas Jeffersson was right",
    author: "Michael Chan",
    url: "https://reactpatterns.com/thomas",
    likes: 32,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(blog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const notesAtEnd = await api.get('/api/blogs')
  expect(notesAtEnd.body).toHaveLength(initialBlogs.length + 1)

  const titles = notesAtEnd.body.map(r => r.title)
  expect(titles).toContain(blog.title)
})

test('blog missing likes defaults to 0', async () => {
  const blog = {
    title: "Thomas Jeffersson was right",
    author: "Michael Chan",
    url: "https://reactpatterns.com/thomas"
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(blog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog missing title or url returns 404', async () => {
  const blog = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/thomas",
    likes: 31
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(blog)
    .expect(404)
})

test('deleting a blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', 'bearer ' + token)
    .expect(200)
})

test('updating a blog likes', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  const updatedLikes = { likes: 420 }
  await api
    .put(`/api/blogs/${id}`)
    .send(updatedLikes)
    .expect(200)

  const res = await api.get('/api/blogs')
  expect(res.body[0].likes).toBe(updatedLikes.likes)
})

afterAll(() => {
  mongoose.connection.close()
})