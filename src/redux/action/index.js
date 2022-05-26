export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';

export const createToken = (state) => ({
  type: TOKEN,
  payload: state,
});

export const setScore = (score) => ({
  type: SCORE,
  payload: score,
});
