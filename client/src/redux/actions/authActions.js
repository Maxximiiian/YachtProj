import axios from 'axios';
import { LOGOUT, SET_AUTH } from '../types/types';

export const setAuthAC = (payload) => ({ type: SET_AUTH, payload });
export const logout = () => ({ type: LOGOUT });

export const userSignInThunk = (input) => (dispatch) => {
  axios.post('/api/v1/auth', input)
    .then((res) => dispatch(setAuthAC(res.data)))
    .catch((err) => console.log(err));
};

// export const userSignUp = (input) => (dispatch) => {
//   axios.post('/api/v1/potentionalRegistration', input)
//     .then((res) => dispatch(setAuth(res.data)))
//     .catch((err) => console.log('err'));
// };
