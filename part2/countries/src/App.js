import React, { useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

function App() {
  const [filterName, setFilterName] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState()
  const [weather, setWeather] = useState()

  const api_key = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    if (event.target.value !== '') {
      axios
        .get('https://restcountries.eu/rest/v2/name/' + event.target.value, { validateStatus: false })
        .then(response => {
          const countries = response.data
          setCountries(countries)
          if (response.data.length === 1) {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + countries[0].capital + '&appid=' + api_key
            axios
              .get(url)
              .then(response => {
                setWeather(response.data)
                setCountryToShow(countries[0])
              })
          } else {
            setCountryToShow(undefined)
          }
        })
    }
  }

  const handleShow = (country) => e => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
        setCountryToShow(country)
      })
  }

  return (
    <>
      <h1>find countries</h1>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} handleShow={handleShow} />
      <CountryInfo country={countryToShow} weather={weather} />
    </>
  );
}

export default App
