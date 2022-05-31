import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../services/getAPI';
import { createToken, settings } from '../redux/action';
import styles from '../styles/Login.module.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      loading: false,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.setState(() => ({
      loading: true,
    }), async () => {
      const { token } = await fetchToken();
      localStorage.setItem('token', token);
      const { history, setToken } = this.props;
      const { name, email } = this.state;
      history.push('/game');
      setToken({ name, gravatarEmail: email });
    });
  }

  handleClickSettings = () => {
    const { history, setSettings } = this.props;
    setSettings({ category: '' });
    history.push('/settings');
  }

  render() {
    const { name, email, loading } = this.state;
    const emailCheck = /^.*@.*\.com$/.test(email);
    return loading ? <p>LOADING...</p> : (
      <form className={ styles.container }>
        <h1>Login</h1>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          placeholder="Type your name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          autoComplete="none"
          data-testid="input-gravatar-email"
          value={ email }
          placeholder="Type your email"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ name.length < 1 || !emailCheck }
        >
          PLAY
        </button>
        <button
          onClick={ this.handleClickSettings }
          type="button"
          data-testid="btn-settings"
        >
          SETTINGS
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (state) => dispatch(createToken(state)),
  setSettings: (state) => dispatch(settings(state)),
});

export default connect(null, mapDispatchToProps)(Login);
