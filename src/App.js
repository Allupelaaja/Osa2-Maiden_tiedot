import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Finder = (props) => {
  return(
    <div>
      find countries <input value={props.newFilter}
      onChange={props.handler}
      />
    </div>
  )
}

const Countries = (props) => {
  if (props.newFilter.toLowerCase() === '') {
    return (
    <div>
      <p>Countries will be listed here</p>      
    </div>)
  } else {
    const results = props.countries.filter(function (country) {return country.name.toLowerCase().includes(props.newFilter.toLowerCase())})
    if (results.length > 1 && results.length <= 10) {
      return (results.map(country =>
        <p key={country.name}>{country.name} <button onClick={function (e) {props.setNewFilter(e.target.value)}} value={country.name}>show</button></p>
      ))
    } else if (results.length === 1) {
      return (
        results.map(country =>
          <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
              {(country.languages.map(language =>
              <li key={language.name}>{language.name}</li>))}
            </ul>
            <img src={country.flag} alt={country.name + " flag"} width="100"></img>
          </div>
        )
      )
    } else if (results.length === 0) {
      return (
      <div>
        <p>Found ({results.length}) results, specify another filter</p>      
      </div>)
    } else {
      return (
      <div>
        <p>Too many matches ({results.length}), specify another filter</p>      
      </div>)
    }
  }
}

const App = () => {
  const [ newFilter, setNewFilter] = useState('')
  const [ countries, setCountries] = useState([]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Finder handler={handleFilterChange} newFilter={newFilter}/>
      <Countries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App;
