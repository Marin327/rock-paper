import React from 'react';

const ChoiceButton = ({ onChoice }) => {
  return (
    <div>
      <button onClick={() => onChoice('rock')}>Rock</button>
      <button onClick={() => onChoice('paper')}>Paper</button>
      <button onClick={() => onChoice('scissors')}>Scissors</button>
    </div>
  );
};

export default ChoiceButton;