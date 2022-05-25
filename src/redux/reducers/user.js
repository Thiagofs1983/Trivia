import { TOKEN } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      ...action.payload,
      token: action.token,
    };
  default:
    return state;
  }
};

export default user;
