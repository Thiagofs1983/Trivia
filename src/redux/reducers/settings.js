import { SETTINGS } from '../action';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
  qtdeQuestions: 5,
};

const settingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SETTINGS:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default settingReducer;
