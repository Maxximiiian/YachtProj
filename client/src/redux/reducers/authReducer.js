import { SET_AUTH, LOGOUT } from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  console.log(payload, 'payload>>>>>>>>>>>>');
  switch (type) {
    case SET_AUTH:
      return payload;
    case LOGOUT:
      return state;
    default:
      return state;
  }
};
