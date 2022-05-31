import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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

  it('Teste se a pagina contem um botao PLAY e esta desativado', () => {
    renderWithRouter(<App />);
    
    const btnEl = screen.getByTestId('btn-play');
    expect(btnEl).toBeDefined();

    userEvent.click(btnEl);
    expect(btnEl).toBeDisabled();
  });

  it('Input name ter o valor zerado e um userEvent com o nome Yuri', () => {
    renderWithRouter(<App />);

    const inputEl = screen.getByTestId('input-player-name');
    expect(inputEl).toHaveValue('');

    userEvent.type(inputEl, 'Yuri');
    expect(inputEl).toHaveValue('Yuri');
  });

  it('Input name ter o valor zerado e um userEvent com o nome Yuri', () => {
    renderWithRouter(<App />);

    const inputEl = screen.getByTestId('input-gravatar-email');
    expect(inputEl).toHaveValue('');

    userEvent.type(inputEl, 'yuri.350@hotmail.com');
    expect(inputEl).toHaveValue('yuri.350@hotmail.com');
  });

  it('Testa se ao preencher tudo corretamente o botao e liberado', () => {
    renderWithRouter(<App />);

    const inputEl = screen.getByTestId('input-gravatar-email');
    expect(inputEl).toHaveValue('');

    userEvent.type(inputEl, 'yuri.350@hotmail.com');
    expect(inputEl).toHaveValue('yuri.350@hotmail.com');

    const inputEl1 = screen.getByTestId('input-player-name');
    expect(inputEl1).toHaveValue('');

    userEvent.type(inputEl1, 'Yuri');
    expect(inputEl1).toHaveValue('Yuri');

    const btnEl = screen.getByTestId('btn-play');
    expect(btnEl).toBeDefined();

    userEvent.click(btnEl);
    expect(btnEl).not.toBeDisabled();
  });

  it('Teste redirecionamento da pagina login para a proxima pagina', async () => {
    const customHistory = createMemoryHistory();
    renderWithRouter(<App />);

    customHistory.push('/game');
    
    const imgEl = await screen.findByRole('img', { name: 'logo' });
    expect(imgEl).toBeDefined();
    expect(customHistory.location.pathname).toBe('/game')
  });

  it('teste se o botao config esta sendo renderizado', () => {
    renderWithRouter(<App />);

    const buttonEl = screen.getByRole('button', { name: 'SETTINGS'});
    expect(buttonEl).toBeDefined();
  })

  it('verifica se ao clicar no botão settings a página é direcionada', () => {
    renderWithRouter(<App />);
    const buttonEl = screen.getByRole('button', { name: 'SETTINGS'});
    userEvent.click(buttonEl)
    const titleEl = screen.getByRole('heading', { name: /Settings/i, level: 1})
  })

  it('Verifica se a API é chamada', async () => {
    const responseMock = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "f87f8ds97fj13903jjfdklf8123j0fks0a9812k"
    };

    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }));

    const history = createMemoryHistory();
    renderWithRouter(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
        
    userEvent.type(inputName, 'yuri');
    
    userEvent.type(inputEmail, 'yuri@hotmail.com')
    
    const btnEl = screen.getByTestId('btn-play');
    userEvent.click(btnEl);

    expect(jest.spyOn).toHaveBeenCalled();
  });
});
