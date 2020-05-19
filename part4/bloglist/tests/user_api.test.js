const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: "Thomas",
    name: "Thomas Jeffersson",
    passwordHash: "password1234"
  },
  {
    username: "Hamilton",
    name: "Alexander Hamilton",
    passwordHash: "hunter12"
  }
]

beforeEach(async () => {
  // delete all users from test database
  await User.deleteMany({})

  const userObjects = initialUsers.map(user => new User(user))

  const promiseArray = userObjects.map(user => user.save())

  await Promise.all(promiseArray)
})

describe('invalid users', () => {
  test('no username', async () => {
    const user = {
      username: 'adams',
      name: 'John Adams',
      password: 'imjohnadams'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(initialUsers.length)
  })
  test('no password', async () => {
    const user = {
      username: 'adams',
      name: 'John Adams'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})