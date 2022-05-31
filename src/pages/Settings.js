import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { settings } from '../redux/action';
import { fetchCategory } from '../services/getAPI';
import styles from '../styles/Settings.module.css';

class Setings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
      qtdeQuestions: 5,
    };
  }

  componentDidMount() {
    this.getListCategeories();
  }

  getListCategeories = async () => {
    const listCategory = await fetchCategory();
    const triviaCategories = listCategory.trivia_categories;
    this.setState({
      categories: triviaCategories,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), () => {
      const { setSettings } = this.props;
      const { category, difficulty, type, qtdeQuestions } = this.state;
      setSettings({ category, difficulty, type, qtdeQuestions });
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { categories, category, difficulty, type, qtdeQuestions } = this.state;
    return (
      <div className={ styles.container }>
        <h1 data-testid="settings-title">Settings</h1>
        <label htmlFor="qtdeQuestions">
          Number of Questions:
          <input
            type="number"
            name="qtdeQuestions"
            id="qtdeQuestions"
            value={ qtdeQuestions }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="category">
          Select Category:
          <select
            name="category"
            id="category"
            value={ category }
            onChange={ this.handleChange }
          >
            <option value="">All</option>
            {
              categories.map((categorie) => (
                <option key={ categorie.id } value={ categorie.id }>
                  { categorie.name }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="difficulty">
          Select Difficulty:
          <select
            name="difficulty"
            id="difficulty"
            value={ difficulty }
            onChange={ this.handleChange }
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="type">
          Select Type:
          <select
            name="type"
            id="type"
            value={ type }
            onChange={ this.handleChange }
          >
            <option value="">All</option>
            <option value="multiple">Multiple Choise</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Login
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSettings: (state) => dispatch(settings(state)),
});

Setings.propTypes = {
  setSettings: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Setings);
