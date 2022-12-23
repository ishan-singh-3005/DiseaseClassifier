import React, { useState } from 'react';
import './Heart.css'
var ReactRotatingText = require('react-rotating-text');

export default function Heart() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answersU, setAnswersU] = useState({});
  const [result, setResult] = useState("");
  const [submit, setSubmit] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);

  const questions = [
    {
      id: 'Smoking',
      text: 'Smoking?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'AlcoholDrinking',
      text: 'Alcohol?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'Stroke',
      text: 'Stroke?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'DiffWalking',
      text: 'Different walking?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'Sex',
      text: 'Sex?',
      choices: ['Male', 'Female', 'Skip'],
    },
    {
      id: 'AgeCategory',
      text: 'Age?',
      choices: ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80 or older', 'Skip'],
    },
    {
      id: 'Race',
      text: 'Race?',
      choices: ['American Indian/Alaskan Native', 'Asian', 'Black', 'Other', 'Hispanic', 'White', 'Skip'],
    },
    {
      id: 'Diabetic',
      text: 'Diabetic?',
      choices: ['No', 'Yes (during pregnancy)', 'Yes', '"No borderline diabetes"', 'Skip'],
    },
    {
      id: 'PhysicalActivity',
      text: 'Physical Activity?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'GenHealth',
      text: 'Genetic Health?',
      choices: ['Fair', 'Good', 'Poor', 'Very good', 'Excellent', 'Skip'],
    },
    {
      id: 'Asthma',
      text: 'Asthma?',
      choices: ['No', 'Yes', 'Skip'],
    },
    {
      id: 'KidneyDisease',
      text: 'Kideny disease?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'SkinCancer',
      text: 'Skin cancer?',
      choices: ['Yes', 'No', 'Skip'],
    }
  ];

  const handleAnswer = async (selectedChoice) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: selectedChoice });
    setAnswersU({ ...answersU, [questions[currentQuestion].text]: selectedChoice });
    setCurrentQuestion(currentQuestion + 1);
  }

  async function handleSubmit(){
    setCalled(true);
    setLoading(true);
    setSubmit("Loading ...")
    console.log(answers)
    var url = "heart?";
    for (var param in answers){
      url = url + param + "=" + answers[param].replaceAll(' ', "+") + "&"
    }
    console.log(url.slice(0, url.length - 1))
    let headersList = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
     }
    let response = await fetch(url, { 
      method: "GET",
      headers: headersList
    });

  let data = await response.text();
  console.log(data);
  setResult(data);
  setLoading(false);
  setSubmit('Done');
  }

  return (
    <div className='section'>
      <h1>Heart</h1>
      {!called ? (
      currentQuestion < questions.length ? (
        <div>
          <h2 className='question'>{questions[currentQuestion].text}</h2>
          <div className='choice-box'>
          {questions[currentQuestion].choices.map((choice, index) => (
            <button className='choices' key={index} onClick={() => handleAnswer(choice)}>
              {choice}
            </button>
          ))}
        </div>
        </div>
      ) : (
        <div>
          <h2 className='question'>Survey finished</h2>
          <h2 className='prompt'>Your answers:</h2>
          <pre className='final-answers'>{JSON.stringify(answersU, null, 2)}</pre>

          <button className='submit' onClick={handleSubmit}>{submit}</button>
        
        </div>
      )
      ) : (
        <div>
          {loading ? (
            <div>
            <h2 className='prompt'>The machine learning models are analzying the data <ReactRotatingText items={["...", "..."]}/></h2>
            <img src='background.gif'/>
            </div>
            ) : (
              <div>
                <h2 className='question'> Here is your result:</h2>
                <h2 className='prompt'>{result}</h2>
              </div>
            )}
            
        </div>
      )}

    </div>
  );
};

