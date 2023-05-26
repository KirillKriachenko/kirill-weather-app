import React, { useState } from 'react'
import Navigations from '../components/homepage/HomeNavigation';
import HomeNavigation from '../components/homepage/HomeNavigation';
import HomeDetails from '../components/homepage/HomeDetails';
import './Home.css';

export interface IHomePage {};

const HomePage: React.FC<IHomePage> = props => {

    return <div className='app-bg' style={{display:'flex', flexDirection:'row'}} >
        <div className='home-content' style={{display:'flex', flexGrow:3}}></div>
        <div className='home-nav' style={{display:'flex', flexGrow:1}}>
            <HomeNavigation />
        </div>
    </div>;
};

export default HomePage;