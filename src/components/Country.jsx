import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

const Country = () => {
  const { id } = useParams();
  console.log(id)
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3001/api/countries/${id}`)
      .then(response => {
        console.log(response.data)
        setItemData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);

  useEffect(() => {
    // Check if itemData is available before making the weather API call
    if (itemData) {
      axios.get(`http://localhost:3001/api/weather/${itemData.capital}`)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  }, [itemData]);
  

  // Check if loading
  if (loading) {
    return <p style={{ color: 'black' }}>Loading...</p>; // or any loading indicator you prefer
  }

  // Check if itemData is available before rendering
  if (!itemData) {
    return <p>Data not available</p>; // Handle the case where data is not available
  }

  // Check if key properties exist before rendering
  const countryName = itemData.name && itemData.name.common ? itemData.name.common : 'N/A';
  const flagSrc = itemData.flags && itemData.flags.png ? itemData.flags.png : 'N/A';

  return (
    <div>
      <div className='header route'>
        <div className="left"></div>
        <div className="center">{countryName}</div>
        <div className="right">
          <Link to="/"><p>Home</p></Link>
        </div>
      </div>
      <div className='body route'>
        {flagSrc !== 'N/A' && (
          <img className='country-flag route' src={flagSrc} alt={`Flag of ${countryName}`} />
        )}
        <p>{itemData.capital || 'N/A'}</p>
        {weatherData && weatherData.weather && weatherData.weather[0] && (
          <>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Main Weather: {weatherData.weather[0].main}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Country;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';

// const Country = () => {
//   const { id } = useParams();
//   console.log(id)
//   const [itemData, setItemData] = useState(null)
  
//   useEffect(() => {
//     axios.get(`http://localhost:3001/api/countries/${id}`)
//       .then(response => {
//         console.log(response.data)
//         setItemData(response.data)
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error.message);
//       });
//   }, [id])

//   // Check if itemData is available before rendering
//   if (!itemData) {
//     return <p>Loading...</p>; // or any loading indicator you prefer
//   }

//   // Check if key properties exist before rendering
//   const countryName = itemData.name && itemData.name.common ? itemData.name.common : 'N/A';
//   const flagSrc = itemData.flags && itemData.flags.png ? itemData.flags.png : 'N/A';

//   return (
//     <div>
//       <div className='header route'>
//         <p>{countryName}</p>
//       </div>
//       <div className='body route'>
//         {flagSrc !== 'N/A' && (
//           <img className='country-flag route' src={flagSrc} alt={`Flag of ${countryName}`} />
//         )}
//         <p>{itemData.capital || 'N/A'}</p>
//       </div>
//     </div>
//   );
// }

// export default Country;

// import axios from "axios"
// import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';

// const Country = () => {
//   const { id } = useParams();
//   console.log(id)
//   const [itemData, setItemData] = useState(null)
  
//   useEffect(() => {
//     axios.get(`http://localhost:3001/api/countries/${id}`)
//     .then(response => {
//       console.log(response.data)
//       setItemData(response.data)
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error.message);
//       });
//   }, [id])

//   const countryName = itemData.name && itemData.name.common ? itemData.name.common : 'N/A';
//   const flagSrc = itemData.flags && itemData.flags.png ? itemData.flags.png : 'N/A';

//     return (
//       <div>
//         <div className='header route'>
//           <p>{countryName}</p>
//         </div>
//         <div className='body route'>
//           <img className='country-flag route' src={flagSrc} />
//           <p>{itemData.capital}</p>
//         </div>
//       </div>
//     )
// }

// export default Country