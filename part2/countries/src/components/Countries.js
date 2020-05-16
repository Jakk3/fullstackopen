import React from 'react'
import Button from './Button'

const Countries = ({ countries, handleShow }) => {

  if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map(country => <li key={country.name}>{country.name} <Button key={country.name} text="Show" handleClick={handleShow(country)} /></li>)}
      </ul>
    )
  } else if (countries.length > 10) {
    return (
      <>
        <p>
          Too many matches, specify another filter
        </p>
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default Countries