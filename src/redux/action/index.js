export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';

export const createToken = (state) => ({
  type: TOKEN,
  payload: state,
});

export const setScore = (state) => ({
  type: SCORE,
  score: state.score,
  assertions: state.assertions,
});
