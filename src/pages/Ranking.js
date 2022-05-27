import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setScore } from '../redux/action';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('ranking') !== null) {
      this.setState(() => ({
        ranking: JSON.parse(localStorage.getItem('ranking')),
      }), () => {
        const { ranking } = this.state;
        const { userName, userGravatar, userScore } = this.props;
        if (userName !== '') {
          const rankingProps = { userName, userGravatar, userScore };
          this.setState({
            ranking: [...ranking, rankingProps],
          });
          localStorage.setItem('ranking', JSON.stringify([...ranking, rankingProps]));
        }
      });
    } else {
      const { userName, userGravatar, userScore } = this.props;
      if (userName !== '') {
        const rankingProps = { userName, userGravatar, userScore };
        this.setState({
          ranking: [rankingProps],
        });
        localStorage.setItem('ranking', JSON.stringify([rankingProps]));
      }
    }
  }

  handleClickHome = () => {
    const { history, defaultScore } = this.props;
    history.push('/');
    defaultScore({ score: 0, assertion: 0 });
  }

  render() {
    const { ranking } = this.state;
    const rankingSort = ranking.sort((a, b) => b.userScore - a.userScore);
    console.log(rankingSort);
    return (
      <div>
        <h2 data-testid="ranking-title">
          RANKING
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
            { rankingSort.map((player, i) => (
              <tr key={ i }>
                <td>
                  <img
                    src={ player.userGravatar }
                    alt={ `Gravatar ${player.userName}` }
                  />
                </td>
                <td data-testid={ `player-name-${i}` }>{ player.userName }</td>
                <td data-testid={ `player-score-${i}` }>{ player.userScore }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickHome }
        >
          HOME
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userGravatar: state.player.gravatar,
  userScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  defaultScore: (score) => dispatch(setScore(score)),
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userName: PropTypes.string.isRequired,
  userGravatar: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
  defaultScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
