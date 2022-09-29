import React, { useEffect, useState } from 'react'

import Countries from './components/Countries'
import './app.css'
import Search from './components/Search'

let url = "https://restcountries.com/v3.1/all"

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const fetchData = async (url) => {
    try {
      setIsLoading(true)

      let response = await fetch(url)
      let data = await response.json()
      setCountries(data)
      setFilteredCountries(data)
      setIsLoading(false)
      setError(null)

    } catch(error) {
      setIsLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [url])

  const handleRemoveCountry = (name) => {
    let filter = filteredCountries.filter((country) => country.name.common !== name)
    setFilteredCountries(filter)
  }

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase()
    let searchedCountries = countries.filter((country) => {
      let countryName = country.name.common.toLowerCase()
      return countryName.startsWith(searchValue)
    })
    setFilteredCountries(searchedCountries)
  }

  return (
    <div>
      <h1>Country App</h1>
      {<Search onSearch={handleSearch}/>}
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && <Countries countries={filteredCountries} onRemoveCountry={handleRemoveCountry}/>}
    </div>
  )
}

