import { fetchToken } from '../../services/getAPI';

export const TOKEN = 'TOKEN';

export const createToken = (token, state) => ({
  type: TOKEN,
  payload: state,
  token,
});

export const fetchTokenAPI = (state) => (
  async (dispatch) => {
    try {
      const result = await fetchToken();
      dispatch(createToken(result, state));
    } catch (error) {
      console.log(error);
    }
  }
);
