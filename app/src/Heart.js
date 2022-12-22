import React, { useState } from 'react';

export default function Heart() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


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
    setCurrentQuestion(currentQuestion + 1);
  }

  async function handleSubmit(){
    setLoading(true);
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
  }

  return (
    <div>
      <h1>Heart</h1>
      {currentQuestion < questions.length ? (
        <div>
          <h2>{questions[currentQuestion].text}</h2>
          {questions[currentQuestion].choices.map((choice, index) => (
            <button key={index} onClick={() => handleAnswer(choice)}>
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Survey finished</h2>
          <p>Your answers:</p>
          <pre>{JSON.stringify(answers, null, 2)}</pre>

          <h2>Click submit to view your results</h2>
          <button onClick={handleSubmit}>Submit</button>
          {loading && (
        <p>The machine learning models are analzying the data...</p>
        )}
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
};

