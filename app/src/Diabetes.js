import React, { useState } from 'react';
var ReactRotatingText = require('react-rotating-text');

export default function Diabetes() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answersU, setAnswersU] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState("Submit");
  const [called, setCalled] = useState(false);


  const questions = [
    {id: "HighBP",
    text: "HighBP",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "HighChol",
    text: "HighChol",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "CholCheck",
    text: "CholCheck",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "BMI",
    text: "BMI",
    choices: ['70.0', '76.0', '31.0', '47.0', '85.0', '68.0', '48.0', '62.0', '78.0', '56.0', '80.0', '61.0', '43.0', '26.0', '52.0', '19.0', '30.0', '98.0', '37.0', '57.0', '58.0', '74.0', '18.0', '84.0', '59.0', '34.0', '72.0', '12.0', '75.0', '21.0', '83.0', '82.0', '87.0', '51.0', '41.0', '50.0', '71.0', '40.0', '95.0', '46.0', '81.0', '60.0', '36.0', '35.0', '66.0', '44.0', '92.0', '28.0', '20.0', '89.0', '22.0', '15.0', '77.0', '13.0', '45.0', '39.0', '27.0', '79.0', '38.0', '29.0', '54.0', '14.0', '64.0', '16.0', '24.0', '23.0', '55.0', '65.0', '69.0', '53.0', '73.0', '17.0', '67.0', '49.0', '86.0', '63.0', '42.0', '25.0', '33.0', '32.0', 'Skip']},
    {id: "Smoker",
    text: "Smoker",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "Stroke",
    text: "Stroke",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "HeartDiseaseorAttack",
    text: "HeartDiseaseorAttack",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "PhysActivity",
    text: "PhysActivity",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "Fruits",
    text: "Fruits",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "Veggies",
    text: "Veggies",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "HvyAlcoholConsump",
    text: "HvyAlcoholConsump",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "AnyHealthcare",
    text: "AnyHealthcare",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "NoDocbcCost",
    text: "NoDocbcCost",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "GenHlth",
    text: "GenHlth",
    choices: ['4.0', '5.0', '1.0', '2.0', '3.0', 'Skip']},
    {id: "MentHlth",
    text: "MentHlth",
    choices: ['27.0', '0.0', '21.0', '26.0', '29.0', '10.0', '14.0', '19.0', '30.0', '2.0', '11.0', '16.0', '24.0', '7.0', '23.0', '9.0', '8.0', '17.0', '1.0', '18.0', '3.0', '4.0', '5.0', '20.0', '28.0', '25.0', '22.0', '12.0', '15.0', '6.0', '13.0', 'Skip']},
    {id: "PhysHlth",
    text: "PhysHlth",
    choices: ['27.0', '0.0', '21.0', '26.0', '29.0', '10.0', '14.0', '19.0', '30.0', '2.0', '11.0', '16.0', '23.0', '7.0', '24.0', '9.0', '8.0', '17.0', '1.0', '18.0', '3.0', '4.0', '5.0', '20.0', '28.0', '25.0', '22.0', '12.0', '15.0', '6.0', '13.0', 'Skip']},
    {id: "DiffWalk",
    text: "DiffWalk",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "Sex",
    text: "Sex",
    choices: ['0.0', '1.0', 'Skip']},
    {id: "Age",
    text: "Age",
    choices: ['11.0', '6.0', '10.0', '3.0', '9.0', '1.0', '5.0', '4.0', '7.0', '12.0', '13.0', '8.0', '2.0', 'Skip']},
    {id: "Education",
    text: "Education",
    choices: ['6.0', '3.0', '1.0', '5.0', '4.0', '2.0', 'Skip']},
    {id: "Income",
    text: "Income",
    choices: ['6.0', '3.0', '1.0', '5.0', '4.0', '7.0', '8.0', '2.0', 'Skip']}
  ];

  const handleAnswer = async (selectedChoice) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: selectedChoice });
    setAnswersU({ ...answersU, [questions[currentQuestion].text]: selectedChoice });
    setCurrentQuestion(currentQuestion + 1);
  }

  async function handleSubmit(){
    setSubmit("Loading ...");
    setLoading(true);
    setCalled(true);
    console.log(answers)
    var url = "diabetes?";
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
  setSubmit("Done");
  }

  return (
    <div className='section'>
        <h1>Diabetes</h1>
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

