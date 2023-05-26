import React from 'react'
import { ICityData, IWeatherData } from '../../pages/Home';
import { FaRegTrashAlt } from 'react-icons/fa';

interface IFavoriteCity {
    dataKey: Number,
    weatherData: IWeatherData,
    onDelete: () => void,
    onClick: () => void
}

const FavoriteCities: React.FC<IFavoriteCity> = (props) => {
    return (
        <div style={{ backgroundColor: 'white', width: 293, padding: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => {props.onClick()}} style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly', cursor:'pointer'}}>
                <p>
                    {props.weatherData.city.name}
                </p>
                <p>
                    {String(props.weatherData.main.temp)} {props.weatherData.units == 'metric' ? 'Cº' : 'Fº'} 
                </p>
            </div>

            <FaRegTrashAlt style={{cursor:'pointer'}} onClick={() => { props.onDelete() }} />
        </div>
    )
}

export default FavoriteCities;