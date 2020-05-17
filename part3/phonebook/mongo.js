const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log(url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[2] && process.argv[3]) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  person.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
  })
} else {
  Person.find({})
    .then(persons => {
      console.log(persons);
      mongoose.connection.close()
    })
}
