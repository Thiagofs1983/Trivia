import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouterAndRedux';

describe('1 - App.js', () => {
  it('Teste se o a img Logo esta renderizado', () => {
    renderWithRouter(<App />);

    const triviaEl = screen.getByRole('img', { name: 'logo' });
    expect(triviaEl).toBeDefined();
  });

  it('Teste se a pagina contem um h1 com o texto Login', () => {
    renderWithRouter(<App />);

    const textEl = screen.getByRole('heading',
      { level: 1, name: 'Login' });
    expect(textEl).toBeDefined();
  });

  it('Teste se a pagina contem um input Nome e Email', () => {
    renderWithRouter(<App />);
    
    const inputEl = screen.getByTestId('input-player-name');
    expect(inputEl).toBeDefined();

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeDefined();
  });

  it('Teste se a pagina contem um botao PLAY', () => {
    renderWithRouter(<App />);
    
    const btnEl = screen.getByTestId('btn-play');
    expect(btnEl).toBeDefined();

    userEvent.click(btnEl);
    expect(btnEl).toBeDisabled();
  });
});
