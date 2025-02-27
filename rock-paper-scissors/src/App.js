import React, { useState, useEffect } from "react";
import { Container, Typography, CssBaseline, Box, Button, Grid } from "@mui/material";
import GameHistory from "./components/GameHistory";
import { io } from 'socket.io-client';

// Свързване към сървъра
const socket = io('http://localhost:3001');

const choices = ["rock", "paper", "scissors"];

function App() {
  const [myChoice, setMyChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Слушаме събития от сървъра за резултат
    socket.on("result", ({ myMove, opponentMove, winner }) => {
      console.log("Получен резултат:", myMove, opponentMove, winner);
      setMyChoice(myMove);
      setOpponentChoice(opponentMove);
      setResult(winner);

      if (winner === "Ти печелиш!") {
        setMyScore((prev) => prev + 1);
      } else if (winner === "Противникът печели!") {
        setOpponentScore((prev) => prev + 1);
      }

      // Добавяне на новата игра в историята
      setHistory((prevHistory) => [
        ...prevHistory,
        { player: myMove, computer: opponentMove, result: winner },
      ]);
    });

    // Премахваме слушателя при размонтиране на компонента
    return () => socket.off("result");
  }, []);

  const play = (choice) => {
    console.log("Изпращам избора:", choice);
    socket.emit("play", choice); // Изпращаме избора на сървъра
  };

  return (
    <div style={{ textAlign: "center" }}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Rock Paper Scissors Game
        </Typography>

        <Typography variant="h4" gutterBottom>
          Избери ход:
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {choices.map((choice) => (
            <Grid item key={choice}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => play(choice)} // Връзка с play функцията
              >
                {choice.toUpperCase()}
              </Button>
            </Grid>
          ))}
        </Grid>

        {myChoice && (
          <div style={{ marginTop: "20px" }}>
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

        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Твоят резултат: {myScore} | Резултат на противника: {opponentScore}
        </Typography>

        <GameHistory history={history} />
      </Container>

      <Box sx={{ textAlign: "center", mt: 3, p: 2, bgcolor: "#e0e0e0" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Rock Paper Scissors | React & Socket.io
        </Typography>
      </Box>
    </div>
  );
}

export default App;
