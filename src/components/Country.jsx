const Country = ({country}) => {
    return (
      <div>
        <div className='header route'>
          <p>{country.name.common}</p>
        </div>
        <div className='body route'>
          <img className='country-flag route' src={country.flags.png} />
          <p>{country.capital}</p>
        </div>
      </div>
    )
}

export default Country