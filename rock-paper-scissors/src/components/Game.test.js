import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";
import { io } from "socket.io-client";

// Мокаем socket.io клиента, за да предотвратим реална връзка
jest.mock("socket.io-client", () => {
  return {
    io: jest.fn(() => ({
      on: jest.fn(),
      emit: jest.fn(),
      off: jest.fn(),
    })),
  };
});

describe("Rock Paper Scissors Game", () => {
  it("трябва да покаже заглавието", () => {
    render(<Game />);
    <a href="https://reactjs.org">Learn React</a>

  });

  it("трябва да има 3 бутона за избор", () => {
    render(<Game />);
    expect(screen.getByText("ROCK")).toBeInTheDocument();
    expect(screen.getByText("PAPER")).toBeInTheDocument();
    expect(screen.getByText("SCISSORS")).toBeInTheDocument();
  });

  it("трябва да изпрати избора при натискане на бутон", () => {
    const { io } = require("socket.io-client");
    render(<Game />);

    const rockButton = screen.getByText("ROCK");
    fireEvent.click(rockButton);

    expect(io().emit).toHaveBeenCalledWith("play", "rock");
  });

  it("трябва да покаже резултат от сървъра", () => {
    const { io } = require("socket.io-client");
    io().on.mockImplementation((event, callback) => {
      if (event === "result") {
        callback({
          myMove: "rock",
          opponentMove: "scissors",
          winner: "Ти печелиш!",
        });
      }
    });

    render(<Game />);

    expect(screen.queryByText("Ти избра: rock")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("ROCK"));

    expect(screen.findByText("Ти избра: rock")).toBeTruthy();
    expect(screen.findByText("Противникът избра: scissors")).toBeTruthy();
    expect(screen.findByText("Ти печелиш!")).toBeTruthy();
  });
});
