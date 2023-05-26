import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomeNavigation.css'
import { FaSearch, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ICityData, IWeatherData } from '../../pages/Home';
import FavoriteCities from './FavoriteCities';


interface IHomeNavigation {
  updateDataHandler: (data: IWeatherData) => void,
  removeFavorite:(data:IWeatherData) => void,
  favoritesList: IWeatherData[]
};

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY

const HomeNavigation: React.FC<IHomeNavigation> = (props) => {


  const navigate = useNavigate();
  const [cityInput, setCityInput] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState<String>('metric')
  // const [favorites, setFavorites] = useState([]);

  const onTextChangeHandler = (text: any) => {
    setCityInput(text);
  }

  const getWeatherData = (cityName: String, metricUnit: String) => {
    console.log(cityName);

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${API_KEY}`).then(async res => {
      console.log(res.data[0]);

      const city: ICityData = {
        name: res.data[0].name,
        state: res.data[0].state,
        country: res.data[0].country,
        lat: res.data[0].lat,
        lon: res.data[0].lon,
      }

      console.log(city)

      let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${metricUnit}`);

      const str = String(weather.data.weather[0].description);
      const descr = str.charAt(0).toUpperCase() + str.slice(1);

      props.updateDataHandler({
        main: {
          feels_like: weather.data.main.feels_like,
          humidity: weather.data.main.humidity,
          temp: weather.data.main.temp,
        },
        city: city,
        sys: {
          sunrise: weather.data.sys.sunrise,
          sunset: weather.data.sys.sunset,
        },
        weather: {
          id: weather.data.weather[0].id,
          main: weather.data.weather[0].main,
          description: descr,
          iconUrl: `https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`,
        },
        units:metricUnit
      })
    })
  }

  const changeMeasureUnitHandler = (unitType:String) => {
    setUnitOfMeasure(unitType);
    console.log(unitType)
    if(cityInput){
      getWeatherData(cityInput,unitType);
    }
    
    
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'NumpadEnter') {
        event.preventDefault();
        if (cityInput != '') {
          getWeatherData(cityInput, unitOfMeasure);
        }

      }
    }

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
      <div style={{ paddingLeft:'60%'}} className='option'>
        <button className={ unitOfMeasure == 'metric' ? 'active': ''} style={{cursor:'pointer'}} onClick={() => changeMeasureUnitHandler('metric') }>Metric</button> | <button style={{cursor:'pointer'}} className={ unitOfMeasure == 'imperial' ? 'active': 'option'} onClick={() => changeMeasureUnitHandler('imperial')}>Imperial</button>
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop:20 }}>
          <input className='search-input' placeholder='Enter City Here' onChange={(obj) => onTextChangeHandler(obj.target.value)} />
          <button type='submit' className='search-btn' onClick={() => getWeatherData(cityInput, unitOfMeasure)}> <FaSearch /></button>
          {/* <button type='submit' className='search-btn' onClick={() => navigate(`/details/${cityInput}`)}> <FaSearch /></button> */}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems:'center', marginTop:20 }}>
        <h3 style={{ color: 'white', fontSize:35 }}>Favorite Cities:</h3>
        {
          props.favoritesList.map((city, index)=> {
            console.log('Index', index)
            return <FavoriteCities key={index} dataKey={index} weatherData={city} onDelete={() => {props.removeFavorite(city)}} onClick={() => navigate(`/details/${city.city.lat}/${city.city.lon}`)}/>
          })
        }
      </div>

    </div>
  )
}

export default HomeNavigation;