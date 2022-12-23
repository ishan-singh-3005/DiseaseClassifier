import React, { useState } from 'react';
import './Quiz.css'
var ReactRotatingText = require('react-rotating-text');

export default function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answersU, setAnswersU] = useState({});
  const [result, setResult] = useState("");
  const [submit, setSubmit] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [started, setStarted] = useState(false);

  let questions = props.questions;

  function handleStart(){
    setStarted(true);
  }

  function handleAnswer (selectedChoice) {
    setAnswers({ ...answers, [questions[currentQuestion].id]: selectedChoice });
    setAnswersU({ ...answersU, [questions[currentQuestion].text]: selectedChoice });
    setCurrentQuestion(currentQuestion + 1);
  }

  async function handleSubmit(){
    setCalled(true);
    setLoading(true);
    setSubmit("Loading ...")
    console.log(answers)
    var url = "http://127.0.0.1:8000/" + props.name.toLowerCase() + "?";
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
      <h1>{props.name}</h1>
      {!started ? (
        <div>
          <button className='submit' onClick={() => handleStart()}>Start Quiz</button>
          </div>
      ) : (
        !called ? (
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
          )
      )}

    </div>
  );
};

