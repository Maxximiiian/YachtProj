import axios from 'axios';
import { LOGOUT, SET_AUTH, CHANGE_USER } from '../types/types';

export const setAuthAC = (payload) => ({ type: SET_AUTH, payload });
export const changeUser = (payload) => ({ type: CHANGE_USER, payload });

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
export const userInfoChange_THUNK = (input) => (dispatch) => {
  console.log('USERInputReduxChange', input);
  fetch('api/v1/auth/changeUser', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(input)
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        dispatch(setAuthAC(res));
      }
    });
};
