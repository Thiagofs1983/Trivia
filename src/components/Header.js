import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { createGravatar } from '../redux/action';
import Score from './Score';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount() {
    const { userEmail } = this.props;
    const hash = md5(userEmail).toString();
    this.setState(() => ({
      gravatar: `https://www.gravatar.com/avatar/${hash}`,
    }), () => {
      const { gravatar } = this.state;
      const { setGravatar } = this.props;
      setGravatar(gravatar);
    });
  }

  render() {
    const { userName, userEmail } = this.props;
    const hash = md5(userEmail).toString();
    return (
      <header>
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="Imagem do Perfil"
            data-testid="header-profile-picture"
          />
        </div>
        <span data-testid="header-player-name">{ userName }</span>
        <Score />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setGravatar: (gravatar) => dispatch(createGravatar(gravatar)),
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  setGravatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
