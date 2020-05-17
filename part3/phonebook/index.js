require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ')
}))

const port = process.env.PORT || 3001

const Person = require('./models/person')

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })

})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  const person = new Person({ name, number })

  if (name && number) {
    person.save()
      .then(savedNote => {
        res.json(savedNote)
      })
      .catch(err => next(err))
  } else {
    res.status(400).json({ error: 'name or number missing' })
  }

})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send("<p> Phonebook has info for " + persons.length + " people.</p> " + "<p>" + Date() + "</p>")
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

app.use(errorHandler)

app.listen(port)