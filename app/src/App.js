import React, { useState } from 'react';
import Quiz from './Quiz';
import Home from './Home'
import './App.css'
import About from './About';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const questionsHealth = [
    {
      id: 'Smoking',
      text: 'Have you smoked at least 100 cigarettes in your entire life?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'AlcoholDrinking',
      text: 'Do you cosume alcohol?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'Stroke',
      text: 'Did you ever have a stroke?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'DiffWalking',
      text: 'Do you have serious difficulty walking or climbing stairs?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'Sex',
      text: 'Are you male or female?',
      choices: ['Male', 'Female', 'Skip'],
    },
    {
      id: 'AgeCategory',
      text: 'Age?',
      choices: ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80 or older', 'Skip'],
    },
    {
      id: 'Race',
      text: 'Imputed race/ethnicity value?',
      choices: ['American Indian/Alaskan Native', 'Asian', 'Black', 'Other', 'Hispanic', 'White', 'Skip'],
    },
    {
      id: 'Diabetic',
      text: 'Did you ever have diabetes?',
      choices: ['No', 'Yes (during pregnancy)', 'Yes', '"No borderline diabetes"', 'Skip'],
    },
    {
      id: 'PhysicalActivity',
      text: 'Have you done any physical activity or exercise during the past 30 days other than your regular job?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'GenHealth',
      text: 'Would you say that in general your health is...',
      choices: ['Fair', 'Good', 'Poor', 'Very good', 'Excellent', 'Skip'],
    },
    {
      id: 'Asthma',
      text: 'Did you ever have asthma?',
      choices: ['No', 'Yes', 'Skip'],
    },
    {
      id: 'KidneyDisease',
      text: 'Not including kidney stones, bladder infection or incontinence, were you ever told you had kidney disease?',
      choices: ['Yes', 'No', 'Skip'],
    },
    {
      id: 'SkinCancer',
      text: 'Did you ever have skin cancer?',
      choices: ['Yes', 'No', 'Skip'],
    }
  ];
  const questionsDiabetes = [
  {
      id: "HighBP",
      text: "Have you EVER been told by a doctor, nurse or other health professional that your blood pressure is high?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "HighChol",
      text: "Have you EVER been told by a doctor, nurse or other health professional that your blood cholesterol is high?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "CholCheck",
      text: "Have you had a cholesterol check within past five years?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "BMI",
      text: "What is your Body Mass Index (BMI)?",
      choices: ['12.0', '13.0', '14.0', '15.0', '16.0', '17.0', '18.0', '19.0', '20.0', '21.0', '22.0', '23.0', '24.0', '25.0', '26.0', '27.0', '28.0', '29.0', '30.0', '31.0', '32.0', '33.0', '34.0', '35.0', '36.0', '37.0', '38.0', '39.0', '40.0', '41.0', '42.0', '43.0', '44.0', '45.0', '46.0', '47.0', '48.0', '49.0', '50.0', '51.0', '52.0', '53.0', '54.0', '55.0', '56.0', '57.0', '58.0', '59.0', '60.0', '61.0', '62.0', '63.0', '64.0', '65.0', '66.0', '67.0', '68.0', '69.0', '70.0', '71.0', '72.0', '73.0', '74.0', '75.0', '76.0', '77.0', '78.0', '79.0', '80.0', '81.0', '82.0', '83.0', '84.0', '85.0', '86.0', '87.0', '89.0', '92.0', '95.0', '98.0', 'Skip']
  },
  {
      id: "Smoker",
      text: "Have you smoked at least 100 cigarettes in your entire life? [Note: 5 packs = 100 cigarettes]",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "Stroke",
      text: "Did you ever have a stroke?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "HeartDiseaseorAttack",
      text: "Have you ever reported having coronary heart disease (CHD) or myocardial infarction (MI)?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "PhysActivity",
      text: "Have you done any physical activity or exercise during the past 30 days other than your regular job?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "Fruits",
      text: "Do you consume fruit 1 or more times per day?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "Veggies",
      text: "Do you consume vegetables 1 or more times per day?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "HvyAlcoholConsump",
      text: "Heavy drinkers (adult men having more than 14 drinks per week and adult women having more than 7 drinks per week)",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "AnyHealthcare",
      text: "Do you have any kind of health care coverage, including health insurance, prepaid plans such as HMOs, or government plans such as Medicare, or Indian Health Service?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "NoDocbcCost",
      text: "Was there a time in the past 12 months when you needed to see a doctor but could not because of cost?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "GenHlth",
      text: "Would you say that in general your health is: rate (1 ~ 5)",
      choices: ['1.0', '2.0', '3.0', '4.0', '5.0', 'Skip']
  },
  {
      id: "MentHlth",
      text: "Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good? (0 ~ 30)",
      choices: ['0.0', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0', '12.0', '13.0', '14.0', '15.0', '16.0', '17.0', '18.0', '19.0', '20.0', '21.0', '22.0', '23.0', '24.0', '25.0', '26.0', '27.0', '28.0', '29.0', '30.0', 'Skip']
  },
  {
      id: "PhysHlth",
      text: "Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good? (0 ~ 30)",
      choices: ['0.0', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0', '12.0', '13.0', '14.0', '15.0', '16.0', '17.0', '18.0', '19.0', '20.0', '21.0', '22.0', '23.0', '24.0', '25.0', '26.0', '27.0', '28.0', '29.0', '30.0', 'Skip']
  },
  {
      id: "DiffWalk",
      text: "Do you have serious difficulty walking or climbing stairs?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = NO/  1 = YES"
  },
  {
      id: "Sex",
      text: "Sex?",
      choices: ['0.0', '1.0', 'Skip'],
      prompt: "0 = female 1 = male"
  },
  {
      id: "Age",
      text: "Age",
      choices: ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80 or older', 'Skip']
  },
  {
      id: "Education",
      text: "What is the highest grade or year of school you completed? (1 ~ 6)",
      choices: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', 'Skip']
  },
  {
      id: "Income",
      text: "Is your annual household income from all sources? 1 = less than 10,000; 5 = less than 35,000; 8 = $75,000 or more",
      choices: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0', '8.0', 'Skip']
  }
];

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
        {currentPage == 2 ? <Quiz questions={questionsHealth} name={"Heart"}/> : <></>}
        {currentPage == 3 ? <Quiz questions={questionsDiabetes} name={"Diabetes"}/> : <></>}
    </div>
  );
};
