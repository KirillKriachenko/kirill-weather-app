import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomeNavigation.css'
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';


interface IHomeNavigation { };

const HomeNavigation: React.FC<IHomeNavigation> = (props) => {


  const navigate = useNavigate();
  const [inputVal, setInpuVal] = useState();
  const [favorites, setFavorites] = useState([]);

  const onTextChangeHandler = (text: any) => {
    setInpuVal(text);
  }

  useEffect(() => {
    const listener = (event:KeyboardEvent) => {
      if(event.key === 'Enter' || event.key === 'NumpadEnter'){
        console.log('Enter Pressed');
        event.preventDefault();
        navigate(`/details/${inputVal}`);
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
          <button type='submit' className='search-btn' onClick={() => navigate(`/details/${inputVal}`)}> <FaSearch /></button>
        </div>
      </div>
      <br />
      <br />

    </div>
  )
}

export default HomeNavigation;