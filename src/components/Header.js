import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Score from './Score';

class Header extends Component {
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
  userName: state.user.name,
  userEmail: state.user.email,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
