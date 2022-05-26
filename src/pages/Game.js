import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestionsAPI } from '../services/getAPI';
import Header from '../components/Header';
import { setScore } from '../redux/action';
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
      score: 0,
      difficulty: '',
      assertions: 0,
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
    this.timeOut = setTimeout(() => {
      clearInterval(this.interval);
      this.setState({
        seconds: 0,
        isDisabled: true,
      });
    }, THIRTY_SECONDS);
  }

  randomAlternatives = (number = 0) => {
    const { questions, indexQuestion } = this.state;
    const falseAlternatives = questions[indexQuestion + number].incorrect_answers;
    const correct = questions[indexQuestion + number].correct_answer;
    const alternatives = [correct, ...falseAlternatives];
    const difficult = questions[indexQuestion + number].difficulty;
    // encontrei essa forma de embaralhar os itens do array no link abaixo.
    // https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=utilizando%20Console.log()%3A-,function%20shuffleArray(inputArray)%7B%0A%20%20%20%20inputArray.sort(()%3D%3E%20Math.random()%20%2D%200.5)%3B%0A%7D,-var%20demoArray%20%3D%20%5B1
    const PARAMETER = 0.5;
    const newArr = alternatives.sort(() => Math.random() - PARAMETER);
    this.setState({
      alternatives: [...newArr],
      difficulty: difficult,
    });
  }

  calculateDifficulty = () => {
    const { difficulty } = this.state;
    const POINT = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return POINT;
    default:
      return 0;
    }
  }

  handleClick = (result) => {
    const POINTS = 10;
    const { seconds } = this.state;
    this.setState({
      isDisabled: true,
    });
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
    if (result === 'correct') {
      this.setState((prev) => ({
        score: prev.score + POINTS + (seconds * this.calculateDifficulty()),
        assertions: prev.assertions + 1,
      }), () => {
        const { setScoree } = this.props;
        const { score, assertions } = this.state;
        setScoree({ score, assertions });
      });
    }
  }

  buttonNext = () => {
    const { history } = this.props;
    const { indexQuestion } = this.state;
    const MAX_LENGTH = 4;
    if (indexQuestion < MAX_LENGTH) {
      this.setState((prev) => ({
        indexQuestion: prev.indexQuestion + 1,
        isDisabled: false,
        seconds: 30,
      }));
      this.randomAlternatives(1);
      this.timer();
    } else {
      history.push('/feedback');
    }
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
    console.log(questionIndex);
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
                    onClick={ () => this.handleClick('correct') }
                    data-testid="correct-answer"
                  >
                    {alternative}
                  </button>
                )
                : (
                  <button
                    type="button"
                    className={ isDisabled === true ? 'wrong' : '' }
                    onClick={ () => this.handleClick('wrong') }
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

const mapDispatchToProps = (dispatch) => ({
  setScoree: (score) => dispatch(setScore(score)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setScoree: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
