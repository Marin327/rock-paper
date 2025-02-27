const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const choices = ["rock", "paper", "scissors"];

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Разрешава достъп от React приложението
}));

io.on("connection", (socket) => {
  console.log("Нов клиент се свърза");

  // Получаваме съобщение с избора на играча
  socket.on("play", (playerChoice) => {
    console.log("Играчът избра:", playerChoice);

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Определяме резултата
    let result;
    if (playerChoice === computerChoice) {
      result = "Няма победител!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "paper" && computerChoice === "rock")
    ) {
      result = "Ти печелиш!";
    } else {
      result = "Противникът печели!";
    }

    // Изпращаме резултата обратно на клиента
    socket.emit("result", {
      myMove: playerChoice,
      opponentMove: computerChoice,
      winner: result,
    });
  });

  // Слушаме за разкачване на клиент
  socket.on("disconnect", () => {
    console.log("Клиентът се изключи");
  });
});

// Стартираме сървъра
server.listen(5000, () => {
  console.log("Сървърът работи на http://localhost:5000");
});
