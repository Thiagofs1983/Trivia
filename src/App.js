import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/Settings" component={ Settings } />

        </Switch>
      </header>
    </div>
  );
}
