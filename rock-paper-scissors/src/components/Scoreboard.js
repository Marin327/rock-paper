import React from 'react';

const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <p>Player: {score.player}</p>
      <p>Computer: {score.computer}</p>
    </div>
  );
};

export default Scoreboard;