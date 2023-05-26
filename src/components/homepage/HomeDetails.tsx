import React, { useState } from "react";
import "./HomeDetails.css";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { ICityData, IWeatherData } from "../../pages/Home";

interface IHomeDetails {
  weatherDetails: IWeatherData;
  updateFavorites: (weatherData: IWeatherData) => void;
}

const HomeDetails: React.FC<IHomeDetails> = (props) => {

  console.log('Weather Details', props.weatherDetails)
  return (
    <div className="details-container">
      <div className="weather-data-container">
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <h2 className="weather-temperature">
            {String(props.weatherDetails.main.temp)} {props.weatherDetails.units == 'metric' ? 'Cº' : 'Fº'} 
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 className="city-name">{props.weatherDetails?.city.name} {props.weatherDetails?.city.state}, {props.weatherDetails?.city.country} <button className="favorites-btn" onClick={() => props.updateFavorites(props.weatherDetails)}><FaStar height={30} width={30} color="yellow" /></button></h1>

            <span style={{display:'flex', flexDirection:'row', alignItems:'center', fontSize:20, gap:15}}>
              <p>
                Feels like: { String(props.weatherDetails.main.feels_like)} {props.weatherDetails.units == 'metric' ? 'Cº' : 'Fº'} 
              </p>
              <p>
                {props.weatherDetails.weather.description}
              </p>
              <img style={{ width: 50 }} src={props.weatherDetails?.weather.iconUrl} alt="icon" />
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
