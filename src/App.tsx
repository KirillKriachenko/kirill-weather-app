import React, { useState } from 'react';
import './App.css';
import Navigations from './components/homepage/HomeNavigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DetailsPage from './pages/Details';

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details'>
          <Route index element={<DetailsPage />} />
          <Route path=':lat/:lon' element={<DetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

