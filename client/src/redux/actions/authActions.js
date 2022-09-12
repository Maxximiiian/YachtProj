import axios from 'axios';
import { LOGOUT, SET_AUTH } from '../types/types';

export const setAuthAC = (payload) => ({ type: SET_AUTH, payload });
export const LogOut = () => ({ type: LOGOUT });

export const userSignInThunk = (input) => (dispatch) => {
  axios.post('/api/v1/auth', input)
    .then((res) => dispatch(setAuthAC(res.data)))
    .catch((err) => console.log(err));
};

export const userLogOut = () => (dispatch) => {
  axios('/api/v1/logout')
    .then((res) => dispatch(setAuthAC({})))
    .catch((err) => console.log(err));
};

export const userCheck = () => (dispatch) => {
  axios.post('/api/v1/check', {
    credentials: 'include'
  })
    .then((res) => dispatch(setAuthAC(res.data)))
    .catch((err) => console.log('err'));
};
