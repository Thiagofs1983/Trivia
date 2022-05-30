import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Feedback from '../pages/Feedback';
//import renderWithRouter from './helpers/renderWithRouterAndRedux';
// import { createMemoryHistory } from 'history';

describe('FeedBack Screen Test', () => {
  
  it('1. Verifica se a img GRAVATAR é renderizada na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const imgEl = screen.findByTestId('header-profile-picture');
    expect(imgEl).toBeInTheDocument();
  });
  
  it('2. Verifica se os botoes estao habilitados e renderizados', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btn1 = screen.getByRole('button', { name: /play again/i });
    expect(btn1).toBeEnabled();

    const btn2 = screen.getByRole('button', { name: /ranking/i });
    expect(btn2).toBeEnabled();
  });
  
  it('3. Verifica rota do botao Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const btnEl = screen.getByRole('button', { name: /play again/i });
    userEvent.click(btnEl);
    
    expect(history.location.pathname).toBe('/');
  });

  it('4. Verifica rota do botao Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const btnEl = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(btnEl);
    
    expect(history.location.pathname).toBe('/ranking');
  });
  
  it('5. Verifica se o texto Could be better... é renderizado', () => {
    renderWithRouterAndRedux(<Feedback />);
    const textEl = screen.getByRole('heading', { name: /Could be better.../i, level: 1 });
    expect(textEl).toBeInTheDocument();
  });
});

/*
describe('FeedBack Screen Test', () => {
  beforeEach(() => {
    renderWithRouter(<Feedback />);
  });

  it('Verifica se a img TRIVIA é renderizada na tela', async () => {
    const imgEl = await screen.findByRole('img', { name: 'logo' });
    expect(imgEl).toBeDefined();
  });

  it('Verifica se a img GRAVATAR é renderizada na tela', async () => {
    const imgEl = await screen.findByTestId('header-profile-picture');
    expect(imgEl).toBeDefined();
  });

  it('Verifica se PLACAR FINAL é renderizado', async () => {
    const headerEl = await screen.findByRole('heading', { name: 'PLACAR FINAL', level: 2 });
    expect(headerEl).toBeDefined();
  });

  it('Verifica se NÚMERO DE ACERTOS é renderizado', async () => {
    const headerEl = await screen.findByRole('heading', { name: 'NÚMERO DE ACERTOS', level: 4 });
    expect(headerEl).toBeDefined();
  });

  it('Verifica se os botoes estao habilitados e renderizados', async () => {
    const btn1 = await screen.getByRole('button', { name: 'Play Again' });
    expect(btn1).toBeDefined();
    expect(btn1).toBeEnabled();

    const btn2 = await screen.getByRole('button', { name: 'Ranking' });
    expect(btn2).toBeDefined();
    expect(btn2).toBeEnabled();
  });

  it('Verifica rota do botao Play Again', () => {
    const customHistory = createMemoryHistory();
    const btnEl = screen.getByRole('button', { name: 'Play Again' });
    userEvent.click(btnEl);
    customHistory.push('/'); // nem sem e nem com ... sempre da erro
    expect(customHistory.location.pathname).toBe('/');
  });

  it('Verifica rota do botao Ranking', () => {
    const customHistory = createMemoryHistory();
    const btnEl = screen.getByRole('button', { name: 'Ranking' });
    userEvent.click(btnEl);
    customHistory.push('/ranking');
    expect(customHistory.location.pathname).toBe('/ranking');
  });

  it('Verifica se o texto Could be better... é renderizado', () => {
    const textEl = screen.getByTestId('feedback-text');
    expect(textEl).toBeDefined();
  });

  it('Verifica se score é igual a 0', () => {
    const textEl = screen.getByTestId('header-score');
    const zero = 0;
    
    expect(textEl).toBeDefined();
    expect(textEl).toEqual(zero);
  })
});
*/
