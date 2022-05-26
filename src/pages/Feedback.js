import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { userScore, userAssertions } = this.props;
    console.log(typeof userAssertions);
    const score = parseInt(userScore, 10);
    const assertions = parseInt(userAssertions, 10);
    return (
      <div data-testid="feedback-text">
        <h2>PLACAR FINAL</h2>
        <h3 data-testid="feedback-total-score">
          { score }
        </h3>
        <h4>NÚMERO DE ACERTOS</h4>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  userScore: PropTypes.number.isRequired,
  userAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userScore: state.player.score,
  userAssertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
