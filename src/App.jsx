import React from 'react';
import { useEffect } from 'react';
import Blob from './components/Blob';
import Question from './components/Question';
import {nanoid} from 'nanoid';
import he from 'he';

export default function App() {

  const [quizIsActive, setQuizIsActive] = React.useState(false);
  const [endGame, setEndGame] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [results, setResults] = React.useState({total: 5, correct: 0});

  React.useEffect(() => {
  
    fetch('https://opentdb.com/api.php?amount=5&difficulty=medium')
      .then(res => res.json())
      .then(data => data.results.map(x => {
        const questionId = nanoid();
        const wrongAnswers = x.incorrect_answers.map(y => ({isCorrect: false, answer: he.decode(y), selected: false, id: nanoid(), questionId: questionId, isChecked: false}));
        return {
          question: he.decode(x.question),
          answers: [...wrongAnswers, {isCorrect: true, answer: he.decode(x.correct_answer), selected: false, id: nanoid(), questionId: questionId, isChecked: false}].sort(() => .5 - Math.random()),
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
    let targetQuestionId;
    
    for (const question of currentQuestions) {
      if (question.id === questionId) {
        for (const answer of question.answers) {
          if (answer.id === answerId) {
            targetQuestionId = question.id;
            question.answers.map(x => x.selected = false);
            answer.selected = !answer.selected;
          }
        }
      }
    }

    setQuestions(currentQuestions);
    setResults(updateScore());

  }

  function updateScore() {
    let totalQuestions = 0;
    let correctAnswers = 0;

    questions.forEach(question => {
      totalQuestions++;
      if (question.answers.filter(x => x.selected && x.isCorrect).length > 0) {
        correctAnswers++;
      }
    });
    
    return {total: totalQuestions, correct: correctAnswers};
  }

  function checkQuiz() {

    let currentQuestions = questions.slice();

    for (const question of currentQuestions) {
      for (const answer of question.answers) {
        answer.isChecked = true;
      }
    }

    setEndGame(endGame => !endGame)
    console.log(`You scored ${results.correct} / ${results.total}!`)
  }

  function startNewGame() {
    setNewGame(newGame => !newGame);
    setQuizIsActive(false);
    setResults({total: 5, correct: 0});
    setEndGame(false);

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
        
        { endGame ? 
          <div className="footer"> 
            <h3>You scored {results.correct} / {results.total} correct answers.</h3> 
              <button className="btn check-btn" onClick={startNewGame}>Play again</button> 
          </div>
          : 
          <div className="footer">
            <button className="btn check-btn" onClick={checkQuiz}>Check answers</button>
          </div>
        }
      
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