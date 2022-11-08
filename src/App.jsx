import React from 'react';
import { useEffect } from 'react';
import Blob from './components/Blob';
import Question from './components/Question';
import {nanoid} from 'nanoid';
import he from 'he';

export default function App() {

  const [quizIsActive, setQuizIsActive] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
  
    fetch('https://opentdb.com/api.php?amount=5&difficulty=medium')
      .then(res => res.json())
      .then(data => data.results.map(x => {
        const wrongAnswers = x.incorrect_answers.map(y => ({isCorrect: false, answer: y, selected: false, id: nanoid()}));
        return {
          question: he.decode(x.question),
          answers: [...wrongAnswers, {isCorrect: true, answer: x.correct_answer, selected: false, id: nanoid()}],
          id: nanoid()
        }
      }))
        .then(res => setQuestions(res))
  }, [newGame])

  const questionElements = questions.map(x => {
    return (
      <Question 
        question={x.question} 
        answers={x.answers} 
        key={x.id} 
        id={x.id} 
        />
    )
  })

  function startQuiz() {
    setQuizIsActive(true);
  }

  return (
    <div className="app">
      <div className="background">
        <Blob/>
        <Blob/>
      </div>
      { quizIsActive 
      ?
      <div className="quiz">
        {questionElements}
        <button className="btn check-btn">Check answers</button>
      </div>
      :
      <div className="start-quiz">
        <h1 className="title">Quizzical</h1>
        <p className="description">Test your knowledge with some random trivia questions!</p>
        <button className="btn" onClick={startQuiz}>Start quiz</button>
      </div>
      }
    </div>
  );
}