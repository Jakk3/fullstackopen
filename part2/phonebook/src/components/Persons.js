import React from 'react'
import Button from './Button'

const Persons = ({ namesToShow, deletePerson }) => {
  return (
    <ul>
      {namesToShow.map(person => <li key={person.name}>{person.name} - {person.number} <Button text='Delete' handleClick={deletePerson(person.id, person.name)} /></li>)}
    </ul>
  )
}

export default Persons