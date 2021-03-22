import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

//Got this from the demo
test('login button disappears', () => {
    render(<App />);
    const loginButtonElement = screen.getByText('Log in');
    const titleElement = screen.getByText('Welcome to Tic-Tac-Toe');
    
    expect(loginButtonElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement);
    expect(loginButtonElement).toHaveStyle({display:"none"});
});

//Had the same logic as the login
test('leader board testing', () => {
    render(<App />);
    const leaderboardButtonElement = screen.getByText('Click to see leaderboard')
    const leaderboardElement = screen.getByText('User Score')
    
    expect(leaderboardButtonElement).toBeInTheDocument();
    fireEvent.click(leaderboardButtonElement);
    expect(leaderboardElement).toHaveStyle({display:"block"});
    fireEvent.click(leaderboardButtonElement);
    expect(leaderboardElement).toHaveStyle({display:"none"});
});

//Checing for the board elements is the same as leaderboard but need to render board.js
//when checking if it has a style of non before logging in, it fails, 
//and thats because the tag by default has style set to inline, which will require a large rework of everything
test('check for tictactoe board elements', () => {
    render(<App />);
    const tictactoeElement = screen.getByText("Current user:")
    const loginButtonElement = screen.getByText('Log in');
    
    expect(loginButtonElement).toBeInTheDocument();
    expect(tictactoeElement).toBeInTheDocument();
    fireEvent.click(loginButtonElement);
    expect(tictactoeElement).toHaveStyle({display:"inline"})
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
