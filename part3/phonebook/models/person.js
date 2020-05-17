const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('error connecting to MongoDB', error.message);
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // _id is an object
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)