import React from 'react';
import Blob from './components/Blob'

export default function App() {
  
  return (
    <div className="app">
      <div className="background">
        <Blob/>
        <Blob/>
      </div>
      <div className="start-quiz">
        <h1 className="title">Quizzical</h1>
        <p className="description">Test your knowledge with some random trivia questions!</p>
        <button className="start-btn">Start quiz</button>
      </div>
    </div>
  );
}