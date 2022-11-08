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
        const questionId = nanoid();
        const wrongAnswers = x.incorrect_answers.map(y => ({isCorrect: false, answer: he.decode(y), selected: false, id: nanoid(), questionId: questionId}));
        return {
          question: he.decode(x.question),
          answers: [...wrongAnswers, {isCorrect: true, answer: he.decode(x.correct_answer), selected: false, id: nanoid(), questionId: questionId}],
          id: questionId
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
        selectAnswer={selectAnswer}
        />
    )
  })

  function startQuiz() {
    setQuizIsActive(true);
  }

  function selectAnswer(e, questionId, answerId) {
    const currentQuestions = questions.slice();
    for (const question of currentQuestions) {
      if (question.id === questionId) {
        for (const answer of question.answers) {
          if (answer.id === answerId) {
            answer.selected = !answer.selected
            console.log(currentQuestions)
          }
        }
      }
    }

    setQuestions(currentQuestions)

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