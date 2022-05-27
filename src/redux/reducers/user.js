import { TOKEN, GRAVATAR, SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatar: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      ...action.payload,
    };
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default user;
