import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomeNavigation.css'
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { ICityData, IWeatherData } from '../../pages/Home';


interface IHomeNavigation { 
  updateDataHandler: (data:IWeatherData) => void
};

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY

const HomeNavigation: React.FC<IHomeNavigation> = (props) => {


  const navigate = useNavigate();
  const [cityInput, setCityInput] = useState('');
  const [unitOfMeasure,setUnitOfMeasure] = useState('metric')
  // const [favorites, setFavorites] = useState([]);

  const onTextChangeHandler = (text: any) => {
    setCityInput(text);
  }

  const getWeatherData = (cityName:String) => {
    console.log(cityName);

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${API_KEY}`).then(async res => {
      console.log(res.data[0]);

      const city: ICityData = {
        name:res.data[0].name,
        state:res.data[0].state,
        country:res.data[0].country,
        lat:res.data[0].lat,
        lon:res.data[0].lon,
      }

      console.log(city)

      let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=${unitOfMeasure}`);

      const str = String(weather.data.weather[0].description);
      const descr = str.charAt(0).toUpperCase() + str.slice(1);

      props.updateDataHandler({
        main:{
          feels_like:weather.data.main.feels_like,
          humidity:weather.data.main.humidity,
          temp:weather.data.main.temp,
        },
        city:city,
        sys:{
          sunrise:weather.data.sys.sunrise,
          sunset:weather.data.sys.sunset,
        },
        weather:{
          id:weather.data.weather[0].id,
          main:weather.data.weather[0].main,
          description: descr,
          iconUrl:`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`,
        }
      })
    })
  }

  useEffect(() => {
    const listener = (event:KeyboardEvent) => {
      if(event.key === 'Enter' || event.key === 'NumpadEnter'){
        event.preventDefault();
        if(cityInput != ''){
          getWeatherData(cityInput);
        }
        
      }
    }

    document.addEventListener("keydown",listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <input className='search-input' placeholder='Enter City Here' onChange={(obj) => onTextChangeHandler(obj.target.value)} />
          <button type='submit' className='search-btn' onClick={() => getWeatherData(cityInput)}> <FaSearch /></button>
          {/* <button type='submit' className='search-btn' onClick={() => navigate(`/details/${cityInput}`)}> <FaSearch /></button> */}
        </div>
      </div>
      <br />
      <br />

    </div>
  )
}

export default HomeNavigation;