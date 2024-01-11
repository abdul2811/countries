import Filter from './Filter'

const Header = ({handleFilterChange, filter}) => {
    return (
      <div className='header'>
        <Filter handleChange={handleFilterChange} countryName={filter} />
      </div>
    )
  }

export default Header