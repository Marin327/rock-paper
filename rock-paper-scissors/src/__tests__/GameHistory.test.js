import React from 'react';
import { render, screen } from '@testing-library/react';
import GameHistory from './GameHistory'; // Пътя може да се наложи да промениш, ако е в друга директория
import '@testing-library/jest-dom'; // За да използваме matchers като .toBeInTheDocument()

describe('GameHistory Component', () => {
  const mockHistory = [
    { player: 'Rock', computer: 'Scissors', result: 'Ти печелиш!' },
    { player: 'Paper', computer: 'Rock', result: 'Ти печелиш!' },
    { player: 'Scissors', computer: 'Scissors', result: 'Равенство' },
  ];

  it('should render game history correctly', () => {
    render(<GameHistory history={mockHistory} />);

    // Проверка дали заглавието "История на играта" е рендерирано
    expect(screen.getByText(/История на играта/i)).toBeInTheDocument();

    // Проверка дали всяка игра е показана правилно
    mockHistory.forEach((entry, index) => {
      expect(screen.getByText(`Игра ${index + 1}: ${entry.player} срещу ${entry.computer} -`)).toBeInTheDocument();
      expect(screen.getByText(entry.result)).toBeInTheDocument();
    });
  });

  it('should display the correct number of games in the history', () => {
    render(<GameHistory history={mockHistory} />);

    // Проверка дали има точно три игри в историята
    expect(screen.getAllByRole('listitem')).toHaveLength(mockHistory.length);
  });

  it('should render a divider between each game entry', () => {
    render(<GameHistory history={mockHistory} />);

    // Проверка дали всеки ListItem е разделен от Divider
    const dividers = screen.getAllByRole('separator');
    expect(dividers).toHaveLength(mockHistory.length - 1); // 2 dividers за 3 игри
  });
});
