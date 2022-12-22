import React, { useState } from 'react';
import Diabetes from './Diabetes';
import Heart from './Heart';
import Home from './Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
        <div>
          {currentPage != 0 ? <button onClick={() => setCurrentPage(0)}>Back to home</button> : <></>}
          <button onClick={() => setCurrentPage(1)}>Heart</button>
          <button onClick={() => setCurrentPage(2)}>Diabetes</button>

        </div>
        {currentPage == 0 ? <Home/> : <></>}
        {currentPage == 1 ? <Heart/> : <></>}
        {currentPage == 2 ? <Diabetes/> : <></>}
    </div>
  );
};
