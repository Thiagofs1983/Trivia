export const GRAVATAR = 'GRAVATAR';
export const SCORE = 'SCORE';
export const TOKEN = 'TOKEN';

export const createToken = (state) => ({
  type: TOKEN,
  payload: state,
});

export const createGravatar = (state) => ({
  type: GRAVATAR,
  payload: state,
});

export const setScore = (state) => ({
  type: SCORE,
  score: state.score,
  assertions: state.assertions,
});
