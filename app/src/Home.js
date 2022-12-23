import React, { useState } from 'react';
import './Home.css'
var ReactRotatingText = require('react-rotating-text');

export default function Home() {
  let taglines = ["The power of machine learning for your health", "Get accurate health insights with HealthML", "Know your health like never before"]

  return (
    <div className='section'>
        <h1>HealthML</h1>
        <h2 className='taglines'><ReactRotatingText items={taglines} /></h2>
        <h2 className='prompt'>Begin by learning how the model is meant to help you improve your health in the about section.</h2>
        <h2 className='prompt'>Choose the "Heart" or "Diabetes" tab to take the quiz yourself.</h2>
    </div>
  );
};

