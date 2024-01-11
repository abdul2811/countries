import Header from './Header'
import CountryData from './CountryData'

const Home = ({filter, handleFilterChange, filteredCountry}) => {
    return (
        <div>
        <Header handleFilterChange={handleFilterChange} filter={filter}/>
        <div className='body'>
          <div className='container'> 
            {filteredCountry.map((country, i) => <CountryData country={country} key={i} />)}
          </div>
        </div>
      </div>
    )
}

export default Home