import React from 'react';

const Result = ({ userChoice, computerChoice, result }) => {
  if (!userChoice || !computerChoice) return null; // Не показваме резултата, ако няма избори

  return (
    <div className="result-container">
      <h2>Game Result</h2>
      <p>Your choice: {userChoice}</p>
      <p>Computer's choice: {computerChoice}</p>
      <h3>{result}</h3>
    </div>
  );
};

export default Result;