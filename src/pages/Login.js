import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../services/getAPI';
import { fetchTokenAPI } from '../redux/action';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      loading: false,
      isDisabled: true,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  }

  validateBtn = () => {
    const { name, email } = this.state;
    const emailCheck = /^.*@.*\.com$/.test(email);
    const nameCheck = name.length >= 1;
    if (emailCheck && nameCheck) {
      this.setState({ isDisabled: false });
    }
  };

  handleClick = () => {
    this.setState(() => ({
      loading: true,
    }), async () => {
      const { token } = await fetchToken();
      localStorage.setItem('token', token);
      const { history, setToken } = this.props;
      const { name, email } = this.state;
      history.push('/game');
      setToken({ name, email });
    });
  }

  render() {
    const { name, email, isDisabled, loading } = this.state;
    return loading ? <p>CARREGANDO...</p> : (
      <form>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          placeholder="Digite o seu nome"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          value={ email }
          placeholder="Digite o seu email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (state) => dispatch(fetchTokenAPI(state)),
});

export default connect(null, mapDispatchToProps)(Login);
