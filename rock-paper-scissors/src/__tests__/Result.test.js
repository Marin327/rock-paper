import React from 'react';
import { render, screen } from '@testing-library/react';
import Result from './Result'; // Пътя може да се наложи да промениш, ако е в друга директория
import '@testing-library/jest-dom'; // За да използваме matchers като .toBeInTheDocument()

describe('Result Component', () => {

  it('should render the result correctly when userChoice and computerChoice are provided', () => {
    render(<Result userChoice="Rock" computerChoice="Scissors" result="You Win!" />);

    // Проверка дали всички елементи се рендерират
    expect(screen.getByText(/Your choice: Rock/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer's choice: Scissors/i)).toBeInTheDocument();
    expect(screen.getByText(/You Win!/i)).toBeInTheDocument();
  });

  it('should not render anything if userChoice or computerChoice is missing', () => {
    const { container } = render(<Result userChoice="Rock" computerChoice={null} result="You Win!" />);
    
    // Проверка дали компонентът не рендерира нищо, ако липсва компютърния избор
    expect(container).toBeEmptyDOMElement();

    // Проверка с друг сценарий (липсва избор на потребителя)
    render(<Result userChoice={null} computerChoice="Scissors" result="You Win!" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render the result correctly when all choices and result are provided', () => {
    render(<Result userChoice="Paper" computerChoice="Rock" result="You Win!" />);

    // Проверка дали компонентът правилно рендерира всички елементи
    expect(screen.getByText(/Your choice: Paper/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer's choice: Rock/i)).toBeInTheDocument();
    expect(screen.getByText(/You Win!/i)).toBeInTheDocument();
  });
});
