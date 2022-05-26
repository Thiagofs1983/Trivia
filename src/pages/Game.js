import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchQuestionsAPI } from '../services/getAPI';
import Header from '../components/Header';
import './CSS/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [''],
      indexQuestion: 0,
      alternatives: [''],
      isDisabled: false,
      seconds: 30,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const getToken = await fetchQuestionsAPI(token);
    const { history } = this.props;
    const TOKEN_INVALID = 3;
    if (getToken.response_code === TOKEN_INVALID) {
      history.push('/');
      localStorage.removeItem('token');
    } else {
      this.setState({
        questions: [...getToken.results],
      });
    }
    this.randomAlternatives();
    this.timer();
  }

  timer = () => {
    const ONE_SECOND = 1000;
    const THIRTY_SECONDS = 30000;
    this.interval = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({
        seconds: 0,
        isDisabled: true,
      });
    }, THIRTY_SECONDS);
  }

  randomAlternatives = () => {
    const { questions, indexQuestion } = this.state;
    const falseAlternatives = questions[indexQuestion].incorrect_answers;
    const correct = questions[indexQuestion].correct_answer;
    const alternatives = [correct, ...falseAlternatives];
    // encontrei essa forma de embaralhar os itens do array no link abaixo.
    // https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=utilizando%20Console.log()%3A-,function%20shuffleArray(inputArray)%7B%0A%20%20%20%20inputArray.sort(()%3D%3E%20Math.random()%20%2D%200.5)%3B%0A%7D,-var%20demoArray%20%3D%20%5B1
    const PARAMETER = 0.5;
    const newArr = alternatives.sort(() => Math.random() - PARAMETER);
    this.setState({
      alternatives: [...newArr],
    });
  }

  handleClick = () => {
    this.setState({
      isDisabled: true,
    });
  }

  buttonNext = () => {
    this.setState((prev) => ({
      indexQuestion: prev.indexQuestion + 1,
      isDisabled: false,
    }));
    this.randomAlternatives();
  }

  render() {
    const {
      questions,
      alternatives,
      indexQuestion,
      isDisabled,
      seconds,
    } = this.state;
    const questionIndex = questions[indexQuestion];
    return (
      <main>
        <Header />
        <p>{ Number.isNaN(seconds) ? 0 : seconds }</p>
        <h2 data-testid="question-text">
          {questionIndex.question}
        </h2>
        <p data-testid="question-category">
          {questionIndex.category}
        </p>
        <div data-testid="answer-options">
          {
            alternatives.map((alternative, i) => (
              alternative === questionIndex.correct_answer
                ? (
                  <button
                    type="button"
                    className={ isDisabled === true ? 'correct' : '' }
                    key={ i }
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                    data-testid="correct-answer"
                  >
                    {alternative}
                  </button>
                )
                : (
                  <button
                    type="button"
                    className={ isDisabled === true ? 'wrong' : '' }
                    onClick={ this.handleClick }
                    disabled={ isDisabled }
                    key={ i }
                    data-testid={ `wrong-answer-${i}` }
                  >
                    {alternative}
                  </button>
                )
            ))
          }
        </div>
        {
          isDisabled
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.buttonNext }
              >
                Next
              </button>)
        }
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
