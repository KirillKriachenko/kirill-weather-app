import React from 'react'
import { IDataList } from '../../pages/Details';

interface IDetailsPage {
    cardData: IDataList
    unitMeasure:String
}

const DetailsCard: React.FC<IDetailsPage> = (props) => {
    const imgUrl = `https://openweathermap.org/img/wn/${props.cardData.weather[0].icon}@2x.png`;

    return (
        <div style={{ borderRadius: 20, width: 200, height: 250, padding: 10, backgroundColor: 'rgba(255,192,203,0.8)', textAlign:'center' }}>
            <h3>{String(props.cardData.dt_txt)}</h3>
            <div style={{display:'flex', flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                <p>{String(props.cardData.weather[0].description).toUpperCase()}</p>
                <img src={imgUrl} />
            </div>
            <ul style={{listStyleType:'none', textAlign:'left'}}>
                <li>Temperature: {String(props.cardData.main.temp)}{props.unitMeasure == 'metric' ? 'Cº' : 'Fº'}</li>
                <li>Feels Like: {String(props.cardData.main.feels_like)}{props.unitMeasure == 'metric' ? 'Cº' : 'Fº'}</li>
                <li>Min: {String(props.cardData.main.temp_min)}{props.unitMeasure == 'metric' ? 'Cº' : 'Fº'} | Max: {String(props.cardData.main.temp_max)}{props.unitMeasure == 'metric' ? 'Cº' : 'Fº'}</li>
                <li>Pressure: {String(props.cardData.main.pressure)} [Pa]</li>
                <li>Humidity: {String(props.cardData.main.humidity)}</li>
            </ul>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                {}
            </div>
        </div>
    )
}

export default DetailsCard;