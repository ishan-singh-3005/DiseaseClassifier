import React, { useState } from 'react';
import Diabetes from './Diabetes';
import Heart from './Heart';
import Home from './Home';
import './App.css'
import About from './About';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className='App'>
        <div className='nav'>
          <button className='navbuttons' onClick={() => setCurrentPage(0)}>Home</button>
          <button className='navbuttons' onClick={() => setCurrentPage(1)}>About</button>
          <button className='navbuttons' onClick={() => setCurrentPage(2)}>Heart</button>
          <button className='navbuttons' onClick={() => setCurrentPage(3)}>Diabetes</button>
        </div>
        {currentPage == 0 ? <Home/> : <></>}
        {currentPage == 1 ? <About/> : <></>}
        {currentPage == 2 ? <Heart/> : <></>}
        {currentPage == 3 ? <Diabetes/> : <></>}
    </div>
  );
};
