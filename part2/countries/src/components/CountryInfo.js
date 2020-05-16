import React from 'react'

const CountryInfo = ({ country, weather }) => {
  if (country !== undefined) {
    return (
      <>
        <h2>{country.name}</h2>
        <p>
          capital {country.capital} <br />
            population {country.population}
        </p>

        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} style={{ width: 20 + 'em' }} alt="flag" />
        <h3>Weather in {country.capital}</h3>
        <b>temperature: </b> <span>{weather.main.temp}</span><br />
        <b>weather: </b> <span>{weather.weather.description}</span><br />
        <b>wind: </b> <span>{weather.wind.speed}</span><br />
      </>
    )
  } else {
    return (null)
  }
}

export default CountryInfo