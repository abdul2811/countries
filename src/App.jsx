import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import Header from './components/Header'
import CountryData from './components/CountryData'
import Home from './components/Home'
import './index.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch,
} from 'react-router-dom'

// const Header = ({handleFilterChange, filter}) => {
//   return (
//     <div className='header'>
//       <Filter handleChange={handleFilterChange} countryName={filter} />
//     </div>
//   )
// }

// const CountryData = ({country}) => {
//   return (
//     <div>
//       <div className='country-border'>
//         <img className='country-flag' src={country.flags.png} loading='lazy' />
//       </div>
//       <div className='country-info'>
//         {country.name.common}
//       </div>
//     </div>
//   )
// }

const App = () => {
  
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true);
  const [temperatureData, setTemperatureData] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  const filteredCountry = country.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
    const nameA = a.name.common.toUpperCase(); // ignore case
    const nameB = b.name.common.toUpperCase();
  
    if (nameA < nameB) {
      return -1;
    }
  
    if (nameA > nameB) {
      return 1;
    }
  
    return 0; // names are equal
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // const handleShow = (country) => {
  //   setFilter(country.name.common)
  // }

  const fetchTemperature = (capital) => axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
  .then(response => setTemperatureData(response.data.main.temp))

  // useEffect(() => {
  //   if (filteredCountry.length === 1) {
  //     fetchTemperature(filteredCountry[0].capital[0]);
  //   }
  // }, [filteredCountry]);

  const hook = () => {
    axios
    .get('http://localhost:3001/api/countries')
    .then(response => {
      setCountry(response.data)
      setLoading(false);
      console.log(response.data)
    })
  }

  useEffect(hook, [])

  // const match = useMatch('/:id')
  // const c = match
  //   ? country.find(country => country.cca2 === match.params.id)
  //   : null

  if (loading) {
    return <p style={{ color: 'black' }}>Loading...</p>; // or any loading indicator you prefer
  }

  return (
      <Routes>
        <Route path="/" element={<Home handleFilterChange={handleFilterChange} filter={filter} filteredCountry={filteredCountry} />} />
        <Route path="/:id" element={<Country />} />
      </Routes>
  )
}

export default App
