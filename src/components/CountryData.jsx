import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

const CountryData = ({country}) => {
    return (
      <div>
        <Link to={`/${country.cca2}`}>
            <div className='country-border'>
            <img className='country-flag' src={country.flags.png} loading='lazy' />
            </div>
            <div className='country-info'>
            {country.name.common}
            </div>
        </Link>
      </div>
    )
  }

export default CountryData