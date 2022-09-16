import axios from 'axios';

import { GET_USER_PHOTO, ADD_USER_PHOTO } from '../types/types';

export const getUserPhoto = (payload) => ({ type: GET_USER_PHOTO, payload });
export const addUserPhoto = (payload) => ({ type: ADD_USER_PHOTO, payload });

export const getUserPhotoThunk = (id) => (dispatch) => {
  console.log(id);
  axios.post('http://localhost:3002/api/v1/photo/userphoto', { id })

    .then((res) => dispatch(getUserPhoto(res.data)))
    .catch((err) => console.log(err));
};
// export const userPhotoChange_THUNK = (input) => (dispatch) => {
//   console.log('photoInputReduxChange', input);
//   fetch('api/v1/photo/changePhoto', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include',
//     body: JSON.stringify(input)
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (res) {
//         dispatch(getUserPhoto(res));
//       }
//     });
// };
