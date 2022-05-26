import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { userScore, userAssertions } = this.props;
    console.log(typeof userAssertions);
    const score = parseInt(userScore, 10);
    const assertions = parseInt(userAssertions, 10);
    const QUESTIONS_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <h2>PLACAR FINAL</h2>
        <h3 data-testid="feedback-total-score">
          { score }
        </h3>
        <h4>NÚMERO DE ACERTOS</h4>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">
          { assertions < QUESTIONS_ASSERTIONS ? 'Could be better...' : 'Well Done!' }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  userScore: PropTypes.number.isRequired,
  userAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userScore: state.player.score,
  userAssertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
