import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsService from './services/PersonsService'

const App = () => {

  const [persons, setPersons] = useState([])
  useEffect(() => {
    PersonsService.getAll()
      .then(response => {
        setPersons(response)
        setNamesToShow(response)
      })
  }, [])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [namesToShow, setNamesToShow] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    let nameExists = false
    let personIndex = null
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        nameExists = true
        personIndex = i
        i = persons.length
      }
    }

    if (nameExists) {
      if (window.confirm((`${newName} already exists, update phone number?`))) {
        const updatedPerson = { name: newName, number: newNumber }
        PersonsService.update(persons[personIndex].id, updatedPerson)
          .then(response => {
            const tempPersons = persons.map(p => p.id !== persons[personIndex].id ? p : response)
            setPersons(tempPersons)
            setNamesToShow(tempPersons)
            setFilterName('')
          })

      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setNamesToShow(persons.concat(newPerson))
      PersonsService.add(newPerson)
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    setNamesToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const deletePerson = (id, name) => e => {
    if (window.confirm('Delete ' + name)) {
      PersonsService.del(id)
      const tempPersons = persons.filter(p => p.id !== id)
      setPersons(tempPersons)
      setFilterName('')
      setNamesToShow(tempPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>add a new contact</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App