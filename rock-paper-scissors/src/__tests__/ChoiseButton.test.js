import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChoiceButton from './ChoiceButton'; // пътя може да се наложи да го промениш, ако е в друга директория

describe('ChoiceButton', () => {
  it('renders the buttons correctly', () => {
    render(<ChoiceButton onChoice={() => {}} />);
    
    // Проверяваме дали бутоните за Rock, Paper и Scissors са рендерирани
    expect(screen.getByText(/Rock/i)).toBeInTheDocument();
    expect(screen.getByText(/Paper/i)).toBeInTheDocument();
    expect(screen.getByText(/Scissors/i)).toBeInTheDocument();
  });

  it('calls onChoice with correct value when a button is clicked', () => {
    const mockOnChoice = jest.fn(); // Създаваме мок функция за onChoice
    render(<ChoiceButton onChoice={mockOnChoice} />);
    
    // Симулираме клик върху всеки от бутоните и проверяваме дали mockOnChoice е извикан с правилния аргумент
    fireEvent.click(screen.getByText(/Rock/i));
    expect(mockOnChoice).toHaveBeenCalledWith('rock');

    fireEvent.click(screen.getByText(/Paper/i));
    expect(mockOnChoice).toHaveBeenCalledWith('paper');

    fireEvent.click(screen.getByText(/Scissors/i));
    expect(mockOnChoice).toHaveBeenCalledWith('scissors');
  });
});
