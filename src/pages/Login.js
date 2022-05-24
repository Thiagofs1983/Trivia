import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
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
      return;
    }
    this.setState({ isDisabled: true });
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
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
          onClick={ this.validateBtn }
          disabled={ isDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
