import React, { useState } from "react";
import Navigations from "../components/homepage/HomeNavigation";
import HomeNavigation from "../components/homepage/HomeNavigation";
import HomeDetails from "../components/homepage/HomeDetails";
import "./Home.css";

export interface IFavorites {
  favoritesList: ICityData[];
}

export interface ICityData {
  name: String;
  state: String;
  country: String;
  lat: Number;
  lon: Number;
}

export interface IWeatherData {
  main: {
    feels_like: Number;
    humidity: Number;
    temp: Number;
  };
  city: ICityData;
  sys: {
    sunrise: Number;
    sunset: Number;
  };
  weather: {
    id: Number;
    main: String;
    description: String;
    iconUrl: string | undefined;
  };
  units: String
}

export interface IHomePage {}

const HomePage: React.FC<IHomePage> = (props) => {

  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [favoritesCity, setFavoritesCity] = useState<IWeatherData[]>([])

  const updateDataHandler = (data:IWeatherData) => {
    setWeatherData(data)
  };

  const onAddToFavoritesHandler = (weatherData:IWeatherData) => {
    setFavoritesCity((prevData) => [...prevData,weatherData]);
  }

  const onRemoveFavoritesHandler = (obj:IWeatherData) => {
    setFavoritesCity(favoritesCity.filter(item => item !== obj))
  }

  return (
    <div className="app-bg" style={{ display: "flex", flexDirection: "row" }}>
      <div className="home-content" style={{ display: "flex", flexGrow: 3 }}>
        {
            weatherData && <HomeDetails weatherDetails={weatherData} updateFavorites={onAddToFavoritesHandler} />
        }
      </div>
      <div className="home-nav" style={{ display: "flex", flexGrow: 1 }}>
        <HomeNavigation updateDataHandler={updateDataHandler} favoritesList={favoritesCity} removeFavorite={onRemoveFavoritesHandler} />
      </div>
    </div>
  );
};

export default HomePage;
