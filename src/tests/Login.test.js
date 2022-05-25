import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
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

  it('Teste redirecionamento da pagina login para a proxima pagina', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/game');
    const notFoundHeadingEl = screen.getByRole('heading', { leve: 2,
      name: /Page requested not found/i });

    expect(notFoundHeadingEl).toBeDefined();
  });
});
