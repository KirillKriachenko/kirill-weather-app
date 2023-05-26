import React, { useState } from "react";
import "./HomeDetails.css";
import { IWeatherData } from "../../pages/Home";

interface IHomeDetails {
  weatherDetails: IWeatherData;
}

const HomeDetails: React.FC<IHomeDetails> = (props) => {

  console.log('Weather Details',props.weatherDetails)

  return (
    <div className="details-container">
      <div className="weather-data-container">
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <h2 className="weather-temperature">
            {props.weatherDetails?.main.temp}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 className="city-name">{props.weatherDetails?.city.name} {props.weatherDetails?.city.state}, {props.weatherDetails?.city.country}</h1>
            <h3>
                {props.weatherDetails.weather.description}
            </h3>
            <img style={{width:50}} src={props.weatherDetails?.weather.iconUrl} alt="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
