import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IWeatherData } from './Home';
import axios from 'axios';
import './Details.css'
import DetailsCard from '../components/detailpage/DetailsCard';


const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY

interface EnumServiceGetOrdBy {
    [index: number]: {
        description: String,
        icon: String,
        main: String
    }
}

export interface IDataList {
    dt: Number,
    dt_txt: String,
    main: {
        feels_like: Number,
        grnd_level: Number,
        humidity: Number,
        pressure: Number,
        sea_level: Number,
        temp: Number,
        temp_max: Number,
        temp_min: Number
    },
    weather: EnumServiceGetOrdBy,

}

interface IForecastData {
    city: {
        name: String,
        sunrise: Number,
        sunset: Number,
    },
    list: Array<IDataList>,
    unitMeasure: String
}

export interface IDetailsPage {

};

const DetailsPage: React.FC<IDetailsPage> = (props) => {

    const [message, setMessage] = useState('');
    const { lat, lon } = useParams();
    const [forecastData, setForecastData] = useState<IForecastData>();
    const [unitOfMeasure, setUnitOfMeasure] = useState<String>('metric');

    const getForecastData = async (metric: String) => {
        let result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}`);
        result.data['unitMeasure'] = metric;
        setForecastData(result.data);
        console.log(result.data)
    }

    const changeMeasureUnitHandler = (measureType:String) => {
        getForecastData(measureType);
        setUnitOfMeasure(measureType);
    }


    useEffect(() => {
        getForecastData(unitOfMeasure);
    }, [])

    return <div className='details-bg' style={{textAlign:'center'}}>
        <h1 style={{color:'white'}}>
            {forecastData?.city.name}
        </h1>
        <button className={ unitOfMeasure == 'metric' ? 'active': 'option'} style={{cursor:'pointer'}} onClick={() => changeMeasureUnitHandler('metric') }>Metric</button> | <button style={{cursor:'pointer'}} className={ unitOfMeasure == 'imperial' ? 'active': 'option'} onClick={() => changeMeasureUnitHandler('imperial')}>Imperial</button>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop:20 }}>
            {
                forecastData?.list.map((data, index) => {
                    return <DetailsCard key={index} cardData={data} unitMeasure = {forecastData.unitMeasure} />
                })
            }
        </div>

    </div>
}

export default DetailsPage;