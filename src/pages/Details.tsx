import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

export interface IDetailsPage { };

const DetailsPage: React.FC<IDetailsPage> = (props) => {

    const [message, setMessage] = useState('');
    const { number } = useParams();


    useEffect(() => {
        if(number){
            setMessage('The number is ' + number);
        }
        else{
            setMessage('No number was provided');
        }
    })

    return <div>
        <p>This is Details Page</p>
        <p>{message}</p>
    </div>
}

export default DetailsPage;