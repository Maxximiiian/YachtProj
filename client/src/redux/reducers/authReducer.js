import { SET_AUTH, LOGOUT } from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
