import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { userScore } = this.props;
    return (
      <div>
        <span data-testid="header-score">
          { `Score: ${userScore}` }
        </span>
      </div>
    );
  }
}

Score.propTypes = {
  userScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userScore: state.player.score,
});

export default connect(mapStateToProps)(Score);
