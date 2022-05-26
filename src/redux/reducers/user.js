import { TOKEN, SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      ...action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default user;
