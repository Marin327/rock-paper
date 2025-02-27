import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button, Typography, Grid } from '@mui/material';

// Свързване към сървъра
const socket = io('http://localhost:5000');

const choices = ['rock', 'paper', 'scissors'];

function Game() {
  const [myChoice, setMyChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState('');
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    // Слушаме събитието 'result' от сървъра
    socket.on('result', ({ myMove, opponentMove, winner }) => {
      console.log('Получен резултат:', myMove, opponentMove, winner);
      setMyChoice(myMove);
      setOpponentChoice(opponentMove);
      setResult(winner);

      if (winner === 'Ти печелиш!') {
        setMyScore(prev => prev + 1);
      } else if (winner === 'Противникът печели!') {
        setOpponentScore(prev => prev + 1);
      }
    });

    // При размонтиране на компонента премахваме слушателя
    return () => socket.off('result');
  }, []);

  // Функция за изпращане на избора до сървъра
  const play = (choice) => {
    console.log('Изпращам избора:', choice);
    socket.emit('play', choice);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Избери ход:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {choices.map((choice) => (
          <Grid item key={choice}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => play(choice)}
            >
              {choice.toUpperCase()}
            </Button>
          </Grid>
        ))}
      </Grid>

      {myChoice && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">
            Ти избра: {myChoice}
          </Typography>
          <Typography variant="h5">
            Противникът избра: {opponentChoice}
          </Typography>
          <Typography variant="h4" color="secondary">
            {result}
          </Typography>
        </div>
      )}

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Твоят резултат: {myScore} | Резултат на противника: {opponentScore}
      </Typography>
    </div>
  );
}

export default Game;
