import { SET_SHOW_FORM } from '../types/types';

export default (state = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHOW_FORM:
      return !state;
    default:
      return state;
  }
};
