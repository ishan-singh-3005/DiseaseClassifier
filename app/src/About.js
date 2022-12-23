import React, { useState } from 'react';
import './About.css';

export default function About() {

  return (
    <div className='section'>
        <h1>Learn More</h1>
        <div>
            <h2 className='question'>Understanding what your results mean</h2>
            <p className='answer'>
                Remember that this model is NOT meant to determine if you have the respective disease.
                Based on the input you provide, the model calculates your chances of having the disease and 
                your chances of not having the disease. Again, remember that the model is trained on limited
                data so it is important to not put all your faith in the results. Once the probabilities of
                "having disease" and "not having disease" are calculated, the result is the one with higher
                probability. <br/>
                Therefore, if you get a result of "yes" that means you are at a higher risk of having the 
                disease compared to not having it.
            </p>
        </div>
        <div>
            <h2 className='question'>Data collection</h2>
            <p className='answer'>
                Any information that you input is not connected to you in any way. Moreover, your answers
                are never stored.
            </p>
        </div>
    </div>
  );
};

