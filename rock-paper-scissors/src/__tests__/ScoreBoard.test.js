import React from 'react';
import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard'; // Пътя може да се наложи да промениш в зависимост от структурата на проекта
import '@testing-library/jest-dom'; // За да използваме matchers като .toBeInTheDocument()

describe('Scoreboard Component', () => {
  
  it('should render the player and computer scores correctly', () => {
    const mockScore = { player: 5, computer: 3 };
    
    render(<Scoreboard score={mockScore} />);
    
    // Проверка дали правилно се показват стойностите за играча и компютъра
    expect(screen.getByText(/Player: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer: 3/i)).toBeInTheDocument();
  });

  it('should render 0 score for player and computer if no score is provided', () => {
    const mockScore = { player: 0, computer: 0 };
    
    render(<Scoreboard score={mockScore} />);
    
    // Проверка дали се показват 0 за играча и компютъра
    expect(screen.getByText(/Player: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer: 0/i)).toBeInTheDocument();
  });

  it('should render the scoreboard header correctly', () => {
    const mockScore = { player: 5, computer: 3 };
    
    render(<Scoreboard score={mockScore} />);
    
    // Проверка дали заглавието "Scoreboard" е рендерирано
    expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
  });

});
