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

let persons = [
  {
    "name": "Arto Hellas",
    "number": "441-41415-151",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Alexander Hamilton",
    "number": "312-414-6151",
    "id": 3
  },
  {
    "name": "Thomas Jefferson",
    "number": "414-4141-6262",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person)
    res.json(person)
  else
    res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 999999)
  const name = req.body.name
  const number = req.body.number

  if (persons.find(p => p.name === name)) {
    res.status(400).json({ error: 'name must be unique' })
  } else if (name && number) {
    persons.push({ name, number, id })
    res.status(200).end()
  } else {
    res.status(400).json({ error: 'name or number missing' })
  }

})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  res.send("<p> Phonebook has info for " + persons.length + " people.</p> " + "<p>" + Date() + "</p>"
  )
})

app.listen(port)